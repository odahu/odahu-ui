import {ConfigurationState} from "./types";
import {Reducer} from "redux";
import {ConfigurationActionTypes, fetch, fetchError, fetchSuccess} from "./actions";

const initialState: ConfigurationState = {
    data: {
        common: {
            externalUrls: [],
        },
        training: {
            metricUrl: ""
        }
    },
    loading: false
};

type actionType =
    ReturnType<typeof fetch> |
    ReturnType<typeof fetchSuccess> |
    ReturnType<typeof fetchError>;

export const configurationReducer: Reducer<ConfigurationState, actionType> = (state = initialState, action) => {
    switch (action.type) {
        case ConfigurationActionTypes.FETCH: {
            return {...state, loading: true}
        }
        case ConfigurationActionTypes.FETCH_SUCCESS: {
            return {data: action.payload.configuration, loading: false}
        }
        case ConfigurationActionTypes.FETCH_ERROR: {
            return {...state, error: action.error, loading: false}
        }
        default:
            return state
    }
};

