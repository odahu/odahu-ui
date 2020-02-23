import {action} from 'typesafe-actions'
import {normalize} from "../../utils/enities";
import {AsyncAction} from "../index";
import {PackagingIntegration} from "../../models/odahuflow/PackagingIntegration";

export enum PackagerActionTypes {
    FETCH_ALL = '@@packager/FETCH_ALL',
    FETCH_ALL_SUCCESS = '@@packager/FETCH_ALL_SUCCESS',
    FETCH_ERROR = '@@packager/FETCH_ERROR',
}

// FETCH ALL actions
export const fetchAllPackagers = () => action(PackagerActionTypes.FETCH_ALL);
export const fetchAllPackagerSuccess = (mds: PackagingIntegration[]) => action(
    PackagerActionTypes.FETCH_ALL_SUCCESS,
    {mts: normalize(mds), length: mds.length})
;
export const fetchPackagerError = (error: string) => action(
    PackagerActionTypes.FETCH_ERROR, undefined, undefined, error,
);
export function fetchAllPackagerRequest(): AsyncAction {
    return (dispatch, getState, {packagerService}) => {
        dispatch(fetchAllPackagers());

        return packagerService.getAll()
            .then(mds => dispatch(fetchAllPackagerSuccess(mds)))
            .catch(err => dispatch(fetchPackagerError(String(err))));
    };
}

// EDIT actions
export function editPackagerRequest(packager: PackagingIntegration): AsyncAction<Promise<PackagingIntegration>> {
    return ((dispatch, getState, {packagerService}) => {
        return packagerService.edit(packager);
    })
}

// CREATE actions
export function createPackagerRequest(packager: PackagingIntegration): AsyncAction<Promise<PackagingIntegration>> {
    return ((dispatch, getState, {packagerService}) => {
        return packagerService.create(packager);
    })
}

// DELETE actions
export function deletePackagerRequest(mdID: string): AsyncAction<Promise<void>> {
    return ((dispatch, getState, {packagerService}) => {
        return packagerService.delete(mdID);
    })
}
