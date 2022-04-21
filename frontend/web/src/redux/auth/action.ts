import * as types from './types';

export const loginRequest = (payload: types.LoginPayload): types.LoginAction => {
    return {
        type: types.LOGIN_REQUEST,
        payload
    }
}

export const logoutRequest = () : types.LogoutAction => {
    return {
        type: types.LOGOUT_REQUEST
    }
}