import {AlertState} from "./types";
import {Reducer} from "redux";
import {AlertActionTypes, hideAlert, showErrorAlert, showInfoAlert, showSuccessAlert} from "./actions";

const initialState: AlertState = {
    content: "",
    open: false,
    severity: 'success',
    title: ""
};

type actionType =
    ReturnType<typeof showSuccessAlert> |
    ReturnType<typeof showErrorAlert> |
    ReturnType<typeof showInfoAlert> |
    ReturnType<typeof hideAlert> ;

export const alertReducer: Reducer<AlertState, actionType> = (state = initialState, action) => {
    switch (action.type) {
        case AlertActionTypes.SHOW_SUCCESS: {
            return {severity: "success", open: true, title: action.payload.title, content: action.payload.content}
        }
        case AlertActionTypes.SHOW_ERROR: {
            return {severity: 'error', open: true, title: action.payload.title, content: action.payload.content}
        }
        case AlertActionTypes.SHOW_INFO: {
            return {severity: 'info', open: true, title: action.payload.title, content: action.payload.content}
        }
        case AlertActionTypes.HIDE: {
            return {...state, open: false}
        }
        default:
            return state
    }
};

