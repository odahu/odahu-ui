import {PackagerState} from "./types";
import {Reducer} from "redux";
import {fetchAllPackagers, fetchAllPackagerSuccess, fetchPackagerError, PackagerActionTypes} from "./actions";

const initialState: PackagerState = {
    data: {},
    length: 0,
    loading: false
};

type actionType = ReturnType<typeof fetchAllPackagerSuccess> |
    ReturnType<typeof fetchPackagerError> |
    ReturnType<typeof fetchAllPackagers>

export const packagerReducer: Reducer<PackagerState, actionType> = (state = initialState, action) => {
    switch (action.type) {
        case PackagerActionTypes.FETCH_ALL: {
            return {...state, loading: true}
        }
        case PackagerActionTypes.FETCH_ALL_SUCCESS: {
            return {data: action.payload.mts, loading: false, length: action.payload.length}
        }
        case PackagerActionTypes.FETCH_ERROR: {
            return {...state, error: action.error, loading: false}
        }
        default:
            return state
    }
};

