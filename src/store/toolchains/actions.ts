import {action} from 'typesafe-actions'
import {normalize} from "../../utils/enities";
import {AsyncAction} from "../index";
import {ToolchainIntegration} from "../../models/odahuflow/ToolchainIntegration";

export enum ToolchainActionTypes {
    FETCH_ALL = '@@toolchain/FETCH_ALL',
    FETCH_SUCCESS = '@@toolchain/FETCH_SUCCESS',
    FETCH_ALL_SUCCESS = '@@toolchain/FETCH_ALL_SUCCESS',
    FETCH_ERROR = '@@toolchain/FETCH_ERROR',
}

// FETCH ALL actions
export const fetchAllToolchains = () => action(ToolchainActionTypes.FETCH_ALL);
export const fetchAllToolchainSuccess = (mds: ToolchainIntegration[]) => action(
    ToolchainActionTypes.FETCH_ALL_SUCCESS,
    {mts: normalize(mds), length: mds.length})
;
export const fetchToolchainError = (error: string) => action(
    ToolchainActionTypes.FETCH_ERROR, undefined, undefined, error,
);
export function fetchAllToolchainRequest(): AsyncAction {
    return (dispatch, getState, {toolchainService}) => {
        dispatch(fetchAllToolchains());

        return toolchainService.getAll()
            .then(mds => dispatch(fetchAllToolchainSuccess(mds)));
    };
}

// FETCH actions
export const fetchToolchainSuccess = (toolchain: ToolchainIntegration) => action(
    ToolchainActionTypes.FETCH_SUCCESS, {toolchain}
);

export function fetchToolchainRequest(id: string): AsyncAction<Promise<ToolchainIntegration>> {
    return ((dispatch, getState, {toolchainService}) => {
        return toolchainService.get(id).then(toolchain => {
            dispatch(fetchToolchainSuccess(toolchain));

            return toolchain;
        });
    })
}

// EDIT actions
export function editToolchainRequest(toolchain: ToolchainIntegration): AsyncAction<Promise<ToolchainIntegration>> {
    return ((dispatch, getState, {toolchainService}) => {
        return toolchainService.edit(toolchain);
    })
}

// CREATE actions
export function createToolchainRequest(toolchain: ToolchainIntegration): AsyncAction<Promise<ToolchainIntegration>> {
    return ((dispatch, getState, {toolchainService}) => {
        return toolchainService.create(toolchain);
    })
}

// DELETE actions
export function deleteToolchainRequest(mdID: string): AsyncAction<Promise<void>> {
    return ((dispatch, getState, {toolchainService}) => {
        return toolchainService.delete(mdID);
    })
}
