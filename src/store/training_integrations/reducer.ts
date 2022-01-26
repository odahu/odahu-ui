import {TrainingIntegrationState} from "./types";
import {Reducer} from "redux";
import {
    fetchAllTrainingIntegrations,
    fetchAllTrainingIntegrationSuccess,
    fetchTrainingIntegrationError,
    fetchTrainingIntegrationSuccess,
    TrainingIntegrationActionTypes
} from "./actions";
import {TrainingIntegration} from "../../models/odahuflow/TrainingIntegration";

const initialState: TrainingIntegrationState = {
    data: {},
    length: 0,
    loading: false
};

type actionType = ReturnType<typeof fetchAllTrainingIntegrations> |
    ReturnType<typeof fetchAllTrainingIntegrationSuccess> |
    ReturnType<typeof fetchTrainingIntegrationError> |
    ReturnType<typeof fetchTrainingIntegrationSuccess>

export const trainingIntegrationReducer: Reducer<TrainingIntegrationState, actionType> = (state = initialState, action) => {
    switch (action.type) {
        case TrainingIntegrationActionTypes.FETCH_ALL: {
            return {...state, loading: true}
        }
        case TrainingIntegrationActionTypes.FETCH_ALL_SUCCESS: {
            return {data: action.payload.mts, loading: false, length: action.payload.length}
        }
        case TrainingIntegrationActionTypes.FETCH_ERROR: {
            return {...state, error: action.error, loading: false}
        }
        case TrainingIntegrationActionTypes.FETCH_SUCCESS: {
            const data = {
                ...state.data,
                [action.payload.trainingIntegration.id as string]: action.payload.trainingIntegration,
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

