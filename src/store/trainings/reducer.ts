import {ModelTrainingState} from "./types";
import {Reducer} from "redux";
import {
    TrainingActionTypes,
    fetchAllTrainings,
    fetchAllTrainingsSuccess,
    fetchTrainingError
} from "./actions";

const initialState: ModelTrainingState = {
    data: {},
    length: 0,
    loading: false
};

type actionType = ReturnType<typeof fetchAllTrainings> |
    ReturnType<typeof fetchAllTrainingsSuccess> |
    ReturnType<typeof fetchTrainingError>

export const trainingReducer: Reducer<ModelTrainingState, actionType> = (state = initialState, action) => {
    switch (action.type) {
        case TrainingActionTypes.FETCH_ALL: {
            return {...state, loading: true}
        }
        case TrainingActionTypes.FETCH_ALL_SUCCESS: {
            return {data: action.payload.mts, loading: false, length: action.payload.length}
        }
        case TrainingActionTypes.FETCH_ERROR: {
            return {...state, error: action.error, loading: false}
        }
        default:
            return state
    }
};

