import {ConnectionState} from "./types";
import {Reducer} from "redux";
import {
    ConnectionActionTypes,
    fetchAllConnections,
    fetchAllConnectionsSuccess,
    fetchConnectionsError,
    fetchConnectionSuccess
} from "./actions";

const initialState: ConnectionState = {
    data: {},
    length: 0,
    loading: false
};

type actionType = ReturnType<typeof fetchAllConnections> |
    ReturnType<typeof fetchAllConnectionsSuccess> |
    ReturnType<typeof fetchConnectionsError> |
    ReturnType<typeof fetchConnectionSuccess>

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
        case ConnectionActionTypes.FETCH_SUCCESS: {
            return {
                data: {
                    [action.payload.connection.id as string]: action.payload.connection,
                    ...state.data,
                },
                ...state,
            }
        }
        default:
            return state
    }
};

