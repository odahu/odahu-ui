import {ModelPackagingState} from "./types";
import {Reducer} from "redux";
import {
    fetchAllPackagings,
    fetchAllPackagingsSuccess,
    fetchPackagingError,
    fetchPackagingSuccess,
    PackagingActionTypes
} from "./actions";

const initialState: ModelPackagingState = {
    data: {},
    length: 0,
    loading: false
};

type actionType = ReturnType<typeof fetchAllPackagings> |
    ReturnType<typeof fetchAllPackagingsSuccess> |
    ReturnType<typeof fetchPackagingError> |
    ReturnType<typeof fetchPackagingSuccess>

export const packagingReducer: Reducer<ModelPackagingState, actionType> = (state = initialState, action) => {
    switch (action.type) {
        case PackagingActionTypes.FETCH_ALL: {
            return {...state, loading: true}
        }
        case PackagingActionTypes.FETCH_ALL_SUCCESS: {
            return {data: action.payload.mts, loading: false, length: action.payload.length}
        }
        case PackagingActionTypes.FETCH_ERROR: {
            return {...state, error: action.error, loading: false}
        }
        case PackagingActionTypes.FETCH_SUCCESS: {
            return {
                data: {
                    [action.payload.packaging.id as string]: action.payload.packaging,
                    ...state.data,
                },
                ...state,
            }
        }
        default:
            return state
    }
};

