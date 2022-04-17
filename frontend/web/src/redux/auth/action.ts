import * as types from './types';

export const loginRequest = (payload: types.LoginPayload): types.LoginAction => {
    return {
        type: types.LOGIN_REQUEST,
        payload
    }
}

export const createUserRequest = ( payload: types.CreateUserPayload): types.CreateUserAction => {
    return {
        type: types.CREATE_USER_REQUEST,
        payload
    }
}