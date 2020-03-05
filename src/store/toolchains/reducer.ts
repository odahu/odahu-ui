import {ToolchainState} from "./types";
import {Reducer} from "redux";
import {
    fetchAllToolchains,
    fetchAllToolchainSuccess,
    fetchToolchainError,
    fetchToolchainSuccess,
    ToolchainActionTypes
} from "./actions";

const initialState: ToolchainState = {
    data: {},
    length: 0,
    loading: false
};

type actionType = ReturnType<typeof fetchAllToolchains> |
    ReturnType<typeof fetchAllToolchainSuccess> |
    ReturnType<typeof fetchToolchainError> |
    ReturnType<typeof fetchToolchainSuccess>

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
        case ToolchainActionTypes.FETCH_SUCCESS: {
            return {
                data: {
                    [action.payload.toolchain.id as string]: action.payload.toolchain,
                    ...state.data,
                },
                ...state,
            }
        }
        default:
            return state
    }
};

