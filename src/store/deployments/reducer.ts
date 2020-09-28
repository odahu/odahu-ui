import {ModelDeploymentState} from "./types";
import {Reducer} from "redux";
import {
    DeploymentsActionTypes,
    fetchAllDeployments,
    fetchAllDeploymentsSuccess,
    fetchDeploymentsError,
    fetchDeploymentSuccess
} from "./actions";

const initialState: ModelDeploymentState = {
    data: {},
    length: 0,
    loading: false
};

type actionType = ReturnType<typeof fetchAllDeployments> |
    ReturnType<typeof fetchAllDeploymentsSuccess> |
    ReturnType<typeof fetchDeploymentsError> |
    ReturnType<typeof fetchDeploymentSuccess>

export const deploymentReducer: Reducer<ModelDeploymentState, actionType> = (state = initialState, action) => {
    switch (action.type) {
        case DeploymentsActionTypes.FETCH_ALL: {
            return {...state, loading: true}
        }
        case DeploymentsActionTypes.FETCH_ALL_SUCCESS: {
            return {data: action.payload.mts, loading: false, length: action.payload.length}
        }
        case DeploymentsActionTypes.FETCH_ERROR: {
            return {...state, error: action.error, loading: false}
        }
        case DeploymentsActionTypes.FETCH_SUCCESS: {
            const data = {
                ...state.data,
                [action.payload.deployment.id as string]: action.payload.deployment,
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

