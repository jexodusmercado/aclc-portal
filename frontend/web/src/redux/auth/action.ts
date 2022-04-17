import * as types from './types';

export const loginRequest = (payload: types.LoginPayload): types.LoginAction => {
    return {
        type: types.LOGIN_REQUEST,
        payload
    }
}