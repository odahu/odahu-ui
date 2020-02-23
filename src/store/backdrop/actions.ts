import {action} from 'typesafe-actions'

export enum BackdropActionTypes {
    SHOW = '@@backdrop/SHOW',
    HIDE = '@@backdrop/HIDE',
}

export const showBackdrop = () => action(BackdropActionTypes.SHOW);
export const hideBackdrop = () => action(BackdropActionTypes.HIDE);
