import {action} from 'typesafe-actions'
import {normalize} from "../../utils/enities";
import {AsyncAction} from "../index";
import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";

export enum PackagingActionTypes {
    FETCH_ALL = '@@packagings/FETCH_ALL',
    FETCH_SUCCESS = '@@packagings/FETCH_SUCCESS',
    FETCH_ALL_SUCCESS = '@@packagings/FETCH_ALL_SUCCESS',
    FETCH_ERROR = '@@packagings/FETCH_ERROR',
}

// FETCH ALL actions
export const fetchAllPackagings = () => action(PackagingActionTypes.FETCH_ALL);
export const fetchAllPackagingsSuccess = (mps: ModelPackaging[]) => action(
    PackagingActionTypes.FETCH_ALL_SUCCESS,
    {mts: normalize(mps), length: mps.length})
;
export const fetchPackagingError = (error: string) => action(
    PackagingActionTypes.FETCH_ERROR, undefined, undefined, error,
);

export function fetchAllPackagingRequest(): AsyncAction {
    return (dispatch, getState, {packagingService}) => {
        dispatch(fetchAllPackagings());

        return packagingService.getAll()
            .then(mts => dispatch(fetchAllPackagingsSuccess(mts)))
            .catch(err => dispatch(fetchPackagingError(String(err))));
    };
}

// FETCH actions
export const fetchPackagingSuccess = (packaging: ModelPackaging) => action(
    PackagingActionTypes.FETCH_SUCCESS, {packaging}
);

export function fetchPackagingRequest(id: string): AsyncAction<Promise<ModelPackaging>> {
    return ((dispatch, getState, {packagingService}) => {
        return packagingService.get(id).then(packaging => {
            dispatch(fetchPackagingSuccess(packaging));

            return packaging;
        });
    })
}

// EDIT actions
export function editPackagingRequest(packaging: ModelPackaging): AsyncAction<Promise<ModelPackaging>> {
    return ((dispatch, getState, {packagingService}) => {
        return packagingService.edit(packaging);
    })
}

// CREATE actions
export function createPackagingRequest(packaging: ModelPackaging): AsyncAction<Promise<ModelPackaging>> {
    return ((dispatch, getState, {packagingService}) => {
        return packagingService.create(packaging);
    })
}

// DELETE actions
export function deletePackagingRequest(id: string): AsyncAction<Promise<void>> {
    return ((dispatch, getState, {packagingService}) => {
        return packagingService.delete(id);
    })
}

// LOGS actions
export function fetchPackagingLogsRequest(id: string): AsyncAction<Promise<string>> {
    return ((dispatch, getState, {packagingService}) => {
        return packagingService.logs(id);
    })
}
