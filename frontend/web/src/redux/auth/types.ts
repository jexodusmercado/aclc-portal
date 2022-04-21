export type AuthState = typeof initialState
export type UserDataState = typeof initialState.user.data
export type UserErrorState = typeof initialState.user.error
export type UserAuthenticationState = typeof initialState.user.authenticated
export type UserLoadingState = typeof initialState.user.loading

export const initialState = {
    user: {
        data: {
            id : 0,
            birthday : "",
            created_at : "",
            email : "",
            first_name : "",
            is_active : false,
            last_name : "",
            type : "",
            updated_at : "",
            username : ""
        },
        error : {
            status : 0,
            message : ""
        },
        authenticated : false,
        loading : false,
    }
}

export const LOGIN_REQUEST  = "LOGIN_REQUEST"
export const LOGIN_SUCCESS  = "LOGIN_SUCCESS"
export const LOGIN_FAILED   = "LOGIN_FAILED"

export const LOGOUT_REQUEST     = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS     = "LOGOUT_SUCCESS"
export const LOGOUT_FAILED      = "LOGOUT_FAILED"

export type LoginAction = {
    type        : typeof LOGIN_REQUEST
    payload     : LoginPayload
}
export interface LoginPayload {
    username    : string
    password    : string
}

export type LogoutAction = {
    type        : typeof LOGOUT_REQUEST
}
