import {action} from 'typesafe-actions'
import {normalize} from "../../utils/enities";
import {AsyncAction} from "../index";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";

export enum TrainingActionTypes {
    FETCH_ALL = '@@trainings/FETCH_ALL',
    FETCH_ALL_SUCCESS = '@@trainings/FETCH_ALL_SUCCESS',
    FETCH_ERROR = '@@trainings/FETCH_ERROR',
}

// FETCH ALL actions
export const fetchAllTrainings = () => action(TrainingActionTypes.FETCH_ALL);
export const fetchAllTrainingsSuccess = (mts: ModelTraining[]) => action(
    TrainingActionTypes.FETCH_ALL_SUCCESS,
    {mts: normalize(mts), length: mts.length})
;
export const fetchTrainingError = (error: string) => action(
    TrainingActionTypes.FETCH_ERROR, undefined, undefined, error,
);
export function fetchAllTrainingRequest(): AsyncAction {
    return (dispatch, getState, {trainingService}) => {
        dispatch(fetchAllTrainings());

        return trainingService.getAll()
            .then(mts => dispatch(fetchAllTrainingsSuccess(mts)))
            .catch(err => dispatch(fetchTrainingError(String(err))));
    };
}

// EDIT actions
export function editTrainingRequest(training: ModelTraining): AsyncAction<Promise<ModelTraining>> {
    return ((dispatch, getState, {trainingService}) => {
        return trainingService.edit(training);
    })
}

// CREATE actions
export function createTrainingRequest(training: ModelTraining): AsyncAction<Promise<ModelTraining>> {
    return ((dispatch, getState, {trainingService}) => {
        return trainingService.create(training);
    })
}

// DELETE actions
export function deleteTrainingRequest(id: string): AsyncAction<Promise<void>> {
    return ((dispatch, getState, {trainingService}) => {
        return trainingService.delete(id);
    })
}

// LOGS actions
export function fetchTrainingLogsRequest(id: string): AsyncAction<Promise<string>> {
    return ((dispatch, getState, {trainingService}) => {
        return trainingService.logs(id);
    })
}
