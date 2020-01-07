import {ToolchainState} from "./types";
import {Reducer} from "redux";
import {fetchAllToolchains, fetchAllToolchainSuccess, fetchToolchainError, ToolchainActionTypes} from "./actions";

const initialState: ToolchainState = {
    data: {},
    length: 0,
    loading: false
};

type actionType = ReturnType<typeof fetchAllToolchains> |
    ReturnType<typeof fetchAllToolchainSuccess> |
    ReturnType<typeof fetchToolchainError>

export const toolchainReducer: Reducer<ToolchainState, actionType> = (state = initialState, action) => {
    switch (action.type) {
        case ToolchainActionTypes.FETCH_ALL: {
            return {...state, loading: true}
        }
        case ToolchainActionTypes.FETCH_ALL_SUCCESS: {
            return {data: action.payload.mts, loading: false, length: action.payload.length}
        }
        case ToolchainActionTypes.FETCH_ERROR: {
            return {...state, error: action.error, loading: false}
        }
        default:
            return state
    }
};

