export type AuthState = typeof initialState
export type UserDataState = typeof initialState.user.data
export type UserErrorState = typeof initialState.user.error
export type UserAuthenticationState = typeof initialState.user.authenticated
export type UserLoadingState = typeof initialState.user.loading

export const initialState = {
    user: {
        data: {
            birthday    : "",
            created_at  : "",
            email       : "",
            first_name  : "",
            id          : 1,
            is_active   : false,
            last_name   : "",
            type        : "",
            updated_at  : "",
            username    : ""
        },
        error : {
            status  : 0,
            message : ""
        },
        authenticated   : false,
        loading         : false,
    }
}

export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILED = "LOGIN_FAILED"

export type LoginAction = {
    type: typeof LOGIN_REQUEST
    payload: LoginPayload
};

export interface LoginPayload {
    username: string
    password: string
}
