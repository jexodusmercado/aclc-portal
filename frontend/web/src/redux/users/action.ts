import * as types from './types';

export const createUserRequest = ( payload: types.CreateUserPayload): types.CreateUserAction => {
    return {
        type: types.CREATE_USER_REQUEST,
        payload
    }
}

export const getAllUsersRequest = ( payload? : types.GetUsersPayload): types.GetUsersAction => {
    return {
        type: types.GET_USERS_REQUEST,
        payload
    }
}

export const searchUsersRequest = ( payload : types.GetUsersPayload): types.SearchUsersAction => {
    return {
        type: types.SEARCH_USER_REQUEST,
        payload
    }
}

export const getUserRequest = ( payload : types.GetUserPayload): types.GetUserAction => {
    return {
        type: types.GET_USER_REQUEST,
        payload
    }
}