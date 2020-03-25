import {action} from 'typesafe-actions'
import {AsyncAction} from "../index";
import {Config} from "../../models/odahuflow/Config";

export enum ConfigurationActionTypes {
    FETCH = '@@configuration/FETCH',
    FETCH_SUCCESS = '@@configuration/FETCH_SUCCESS',
    FETCH_ERROR = '@@configuration/FETCH_ERROR',
}

// FETCH actions
export const fetch = () => action(ConfigurationActionTypes.FETCH);
export const fetchSuccess = (conf: Config) => action(
    ConfigurationActionTypes.FETCH_SUCCESS,
    {configuration: conf})
;
export const fetchError = (error: string) => action(
    ConfigurationActionTypes.FETCH_ERROR, undefined, undefined, error,
);

export function fetchRequest(): AsyncAction {
    return (dispatch, getState, {configurationService}) => {
        dispatch(fetch());

        return configurationService.get()
            .then(conf => dispatch(fetchSuccess(conf)));
    };
}
