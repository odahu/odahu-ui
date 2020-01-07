import {action} from 'typesafe-actions'

export enum AlertActionTypes {
    SHOW_SUCCESS = '@@alert/SHOW_SUCCESS',
    SHOW_INFO = '@@alert/SHOW_INFO',
    SHOW_ERROR = '@@alert/SHOW_ERROR',
    HIDE = '@@alert/HIDE',
}

export const showSuccessAlert = (title: string, content: string) => action(AlertActionTypes.SHOW_SUCCESS, {content, title});
export const showErrorAlert = (title: string, content: string) => action(AlertActionTypes.SHOW_ERROR, {content, title});
export const showInfoAlert = (title: string, content: string) => action(AlertActionTypes.SHOW_INFO, {content, title});
export const hideAlert = () => action(AlertActionTypes.HIDE);
