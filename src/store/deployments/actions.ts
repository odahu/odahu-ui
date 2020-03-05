import {action} from 'typesafe-actions'
import {normalize} from "../../utils/enities";
import {AsyncAction} from "../index";
import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";

export enum DeploymentsActionTypes {
    FETCH_ALL = '@@deployments/FETCH_ALL',
    FETCH_SUCCESS = '@@deployments/FETCH_SUCCESS',
    FETCH_ALL_SUCCESS = '@@deployments/FETCH_ALL_SUCCESS',
    FETCH_ERROR = '@@deployments/FETCH_ERROR',
}

// FETCH ALL actions
export const fetchAllDeployments = () => action(DeploymentsActionTypes.FETCH_ALL);
export const fetchAllDeploymentsSuccess = (mds: ModelDeployment[]) => action(
    DeploymentsActionTypes.FETCH_ALL_SUCCESS,
    {mts: normalize(mds), length: mds.length})
;
export const fetchDeploymentsError = (error: string) => action(
    DeploymentsActionTypes.FETCH_ERROR, undefined, undefined, error,
);
export function fetchAllDeploymentRequest(): AsyncAction {
    return (dispatch, getState, {deploymentService}) => {
        dispatch(fetchAllDeployments());

        return deploymentService.getAll()
            .then(mds => dispatch(fetchAllDeploymentsSuccess(mds)));
    };
}

// FETCH actions
export const fetchDeploymentSuccess = (deployment: ModelDeployment) => action(
    DeploymentsActionTypes.FETCH_SUCCESS, {deployment}
);

export function fetchDeploymentRequest(id: string): AsyncAction<Promise<ModelDeployment>> {
    return ((dispatch, getState, {deploymentService}) => {
        return deploymentService.get(id).then(deployment => {
            dispatch(fetchDeploymentSuccess(deployment));

            return deployment;
        });
    })
}

// EDIT actions
export function editDeploymentRequest(deployment: ModelDeployment): AsyncAction<Promise<ModelDeployment>> {
    return ((dispatch, getState, {deploymentService}) => {
        return deploymentService.edit(deployment);
    })
}

// CREATE actions
export function createDeploymentRequest(deployment: ModelDeployment): AsyncAction<Promise<ModelDeployment>> {
    return ((dispatch, getState, {deploymentService}) => {
        return deploymentService.create(deployment);
    })
}

// DELETE actions
export function deleteDeploymentRequest(mdID: string): AsyncAction<Promise<void>> {
    return ((dispatch, getState, {deploymentService}) => {
        return deploymentService.delete(mdID);
    })
}
