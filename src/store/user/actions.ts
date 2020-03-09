import {action} from 'typesafe-actions'
import {AsyncAction} from "../index";
import {UserInfo} from "../../models/odahuflow/UserInfo";

export enum UserActionTypes {
    FETCH_SUCCESS = '@@user/FETCH_SUCCESS',
}

// FETCH actions
export const fetchUserInfoSuccess = (userInfo: UserInfo) => action(
    UserActionTypes.FETCH_SUCCESS, {userInfo}
);

export function fetchUserInfoRequest(): AsyncAction<Promise<UserInfo>> {
    return ((dispatch, getState, {userService}) => {
        return userService.get().then(userInfo => {
            dispatch(fetchUserInfoSuccess(userInfo));

            return userInfo;
        });
    })
}
