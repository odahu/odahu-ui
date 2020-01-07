import {action} from 'typesafe-actions'
import {Connection} from "../../models/odahuflow/Connection";
import {normalize} from "../../utils/enities";
import {AsyncAction} from "../index";

export enum ConnectionActionTypes {
    FETCH_ALL = '@@connections/FETCH_ALL',
    FETCH_ALL_SUCCESS = '@@connections/FETCH_ALL_SUCCESS',
    FETCH_ERROR = '@@connections/FETCH_ERROR',
}

// FETCH ALL actions
export const fetchAllConnections = () => action(ConnectionActionTypes.FETCH_ALL);
export const fetchAllConnectionsSuccess = (conns: Connection[]) => action(
    ConnectionActionTypes.FETCH_ALL_SUCCESS,
    {connections: normalize(conns), length: conns.length})
;
export const fetchConnectionsError = (error: string) => action(
    ConnectionActionTypes.FETCH_ERROR, undefined, undefined, error,
);
export function fetchAllConnectionRequest(): AsyncAction {
    return (dispatch, getState, {connectionService}) => {
        dispatch(fetchAllConnections());

        return connectionService.getAll()
            .then(connections => dispatch(fetchAllConnectionsSuccess(connections)))
            .catch(err => dispatch(fetchConnectionsError(String(err))));
    };
}

// EDIT actions
export function editConnectionRequest(connection: Connection): AsyncAction<Promise<Connection>> {
    return ((dispatch, getState, {connectionService}) => {
        return connectionService.edit(connection);
    })
}

// CREATE actions
export function createConnectionRequest(connection: Connection): AsyncAction<Promise<Connection>> {
    return ((dispatch, getState, {connectionService}) => {
        return connectionService.create(connection);
    })
}

// DELETE actions
export function deleteConnectionRequest(connID: string): AsyncAction<Promise<void>> {
    return ((dispatch, getState, {connectionService}) => {
        return connectionService.delete(connID);
    })
}
