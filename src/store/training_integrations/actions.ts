import {action} from 'typesafe-actions'
import {normalize} from "../../utils/enities";
import {AsyncAction} from "../index";
import {TrainingIntegration} from "../../models/odahuflow/TrainingIntegration";

export enum TrainingIntegrationActionTypes {
    FETCH_ALL = '@@trainingIntegrationFETCH_ALL',
    FETCH_SUCCESS = '@@trainingIntegration/FETCH_SUCCESS',
    FETCH_ALL_SUCCESS = '@@trainingIntegration/FETCH_ALL_SUCCESS',
    FETCH_ERROR = '@@trainingIntegration/FETCH_ERROR',
}

// FETCH ALL actions
export const fetchAllTrainingIntegrations = () => action(TrainingIntegrationActionTypes.FETCH_ALL);
export const fetchAllTrainingIntegrationSuccess = (mds: TrainingIntegration[]) => action(
    TrainingIntegrationActionTypes.FETCH_ALL_SUCCESS,
    {mts: normalize(mds), length: mds.length})
;
export const fetchTrainingIntegrationError = (error: string) => action(
    TrainingIntegrationActionTypes.FETCH_ERROR, undefined, undefined, error,
);
export function fetchAllTrainingIntegrationRequest(): AsyncAction {
    return (dispatch, getState, {trainingIntegrationService}) => {
        dispatch(fetchAllTrainingIntegrations());

        return trainingIntegrationService.getAll()
            .then(mds => dispatch(fetchAllTrainingIntegrationSuccess(mds)));
    };
}

// FETCH actions
export const fetchTrainingIntegrationSuccess = (trainingIntegration: TrainingIntegration) => action(
    TrainingIntegrationActionTypes.FETCH_SUCCESS, {trainingIntegration}
);

export function fetchTrainingIntegrationRequest(id: string): AsyncAction<Promise<TrainingIntegration>> {
    return ((dispatch, getState, {trainingIntegrationService}) => {
        return trainingIntegrationService.get(id).then(trainingIntegration => {
            dispatch(fetchTrainingIntegrationSuccess(trainingIntegration));

            return trainingIntegration;
        });
    })
}

// EDIT actions
export function editTrainingIntegrationRequest(trainingIntegration: TrainingIntegration): AsyncAction<Promise<TrainingIntegration>> {
    return ((dispatch, getState, {trainingIntegrationService}) => {
        return trainingIntegrationService.edit(trainingIntegration);
    })
}

// CREATE actions
export function createTrainingIntegrationRequest(trainingIntegration: TrainingIntegration): AsyncAction<Promise<TrainingIntegration>> {
    return ((dispatch, getState, {trainingIntegrationService}) => {
        return trainingIntegrationService.create(trainingIntegration);
    })
}

// DELETE actions
export function deleteTrainingIntegrationRequest(mdID: string): AsyncAction<Promise<void>> {
    return ((dispatch, getState, {trainingIntegrationService}) => {
        return trainingIntegrationService.delete(mdID);
    })
}
