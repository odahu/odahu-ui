import {ConnectionState} from "./types";
import {Reducer} from "redux";
import {ConnectionActionTypes, fetchAllConnections, fetchAllConnectionsSuccess, fetchConnectionsError} from "./actions";

const initialState: ConnectionState = {
    data: {},
    length: 0,
    loading: false
};

type actionType = ReturnType<typeof fetchAllConnections> | ReturnType<typeof fetchAllConnectionsSuccess> | ReturnType<typeof fetchConnectionsError>

export const connectionReducer: Reducer<ConnectionState, actionType> = (state = initialState, action) => {
    switch (action.type) {
        case ConnectionActionTypes.FETCH_ALL: {
            return {...state, loading: true}
        }
        case ConnectionActionTypes.FETCH_ALL_SUCCESS: {
            return {data: action.payload.connections, loading: false, length: action.payload.length}
        }
        case ConnectionActionTypes.FETCH_ERROR: {
            return {...state, error: action.error, loading: false}
        }
        default:
            return state
    }
};

