import {ModelTrainingState} from "./types";
import {Reducer} from "redux";
import {
    fetchAllTrainings,
    fetchAllTrainingsSuccess,
    fetchTrainingError,
    fetchTrainingSuccess,
    TrainingActionTypes
} from "./actions";

const initialState: ModelTrainingState = {
    data: {},
    length: 0,
    loading: false
};

type actionType = ReturnType<typeof fetchAllTrainings> |
    ReturnType<typeof fetchAllTrainingsSuccess> |
    ReturnType<typeof fetchTrainingError> |
    ReturnType<typeof fetchTrainingSuccess>

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
        case TrainingActionTypes.FETCH_SUCCESS: {
            const data = {
                ...state.data,
                [action.payload.training.id as string]: action.payload.training,
            }
            return {
                ...state,
                data: data,
                length: Object.keys(data).length,
            }
        }
        default:
            return state
    }
};

