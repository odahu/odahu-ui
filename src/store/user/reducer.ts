import {Reducer} from "redux";
import {fetchUserInfoSuccess, UserActionTypes} from "./actions";
import {UserState} from "./types";

const initialState: UserState = {
    data: {},
};

type actionType = ReturnType<typeof fetchUserInfoSuccess>

export const userReducer: Reducer<UserState, actionType> = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_SUCCESS: {
            return {data: action.payload.userInfo}
        }
        default:
            return state
    }
};

