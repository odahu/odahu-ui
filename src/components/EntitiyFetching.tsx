import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {showErrorAlert} from "../store/alert/actions";
import {AsyncAction} from "../store";
import {LoadingPage} from "./LoadingPage";
import {NotFoundPage} from "./NotFoundView";
import {useParams} from "react-router-dom";

export interface FetchHookOutput<T> {
    loading: boolean;
    notFound: boolean;
    entity: T;
}

export function useFetchingEntity<T>(id: string, fetchAction: (id: string) => AsyncAction<Promise<T>>): FetchHookOutput<T> {
    const dispatch: any = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [entity, seEntity] = useState<T>({} as T);

    if (loading) {
        dispatch(fetchAction(id)).then((entity: T) => {
            seEntity(entity);
        }).catch((err: any) => {
            dispatch(showErrorAlert("Error", String(err)));
            setNotFound(true);
        }).finally(() => {
            setLoading(false);
        });
    }

    return {loading, notFound, entity};
}

export type FetchingEntityProps<T> = {
    fetchAction: (id: string) => AsyncAction<Promise<T>>;
} & React.PropsWithChildren<any>

export function FetchingEntity<T>({children, fetchAction}: FetchingEntityProps<T>) {
    const {id} = useParams();
    const {entity, loading, notFound} = useFetchingEntity(id as string, fetchAction);

    if (loading) {
        return <LoadingPage/>;
    }

    if (notFound) {
        return <NotFoundPage/>;
    }

    return (
        <>
            {children(entity)}
        </>
    )
}
