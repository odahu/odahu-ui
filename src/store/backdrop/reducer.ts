import {BackdropState} from "./types";
import {Reducer} from "redux";
import {BackdropActionTypes, hideBackdrop, showBackdrop} from "./actions";

const initialState: BackdropState = {
    open: false
};

type actionType =
    ReturnType<typeof showBackdrop> |
    ReturnType<typeof hideBackdrop>

export const backdropReducer: Reducer<BackdropState, actionType> = (state = initialState, action) => {
    switch (action.type) {
        case BackdropActionTypes.SHOW: {
            return {open: true}
        }
        case BackdropActionTypes.HIDE: {
            return {open: false}
        }
        default:
            return state
    }
};

