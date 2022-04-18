/**
 * TYPED STATES
 */
export type UserState           = typeof initialState
export type CreateState         = typeof initialState.created
export type GetAllUsersState    = typeof initialState.users
export type GetUserState        = typeof initialState.user

/**
 * STATES
 */
export const initialState = {
    users: {
        data: [
            {
                id: 0,
                username: "",
                email: "",
                first_name: "",
                last_name: "",
                birthday: "",
                type: "",
                is_active: false,
                updated_at: "",
                created_at: "",
            }
        ],
        loading: false
    },
    user: {
        id: 0,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        birthday: "",
        type: "",
        is_active: false,
        updated_at: "",
        created_at: "",
        loading: false
    },
    created: {
        loading: false,
        success: false
    }
}

/**
 * CONSTANTS
 */

export const GET_USERS_REQUEST  = "GET_USERS_REQUEST"
export const GET_USERS_SUCCESS  = "GET_USERS_SUCCESS"
export const GET_USERS_FAILED   = "GET_USERS_FAILED"

export const GET_USER_REQUEST   = "GET_USER_REQUEST"
export const GET_USER_SUCCESS   = "GET_USER_SUCCESS"
export const GET_USER_FAILED    = "GET_USER_FAILED"

export const SEARCH_USER_REQUEST   = "SEARCH_USER_REQUEST"
export const SEARCH_USER_SUCCESS   = "SEARCH_USER_SUCCESS"
export const SEARCH_USER_FAILED    = "SEARCH_USER_FAILED"

export const CREATE_USER_REQUEST    = "CREATE_USER_REQUEST"
export const CREATE_USER_SUCCESS    = "CREATE_USER_SUCCESS"
export const CREATE_USER_FAILED     = "CREATE_USER_FAILED"

/**
 * ACTIONS
 */

export type GetUsersAction = {
    type        : typeof GET_USERS_REQUEST
    payload?    : GetUsersPayload
}

export type SearchUsersAction = {
    type        : typeof SEARCH_USER_REQUEST
    payload     : GetUsersPayload
}

export type GetUserAction = {
    type        : typeof GET_USER_REQUEST
    payload     : GetUserPayload
}

export type CreateUserAction = {
    type        : typeof CREATE_USER_REQUEST,
    payload     : CreateUserPayload
}

/**
 * INTERFACES
 */

export interface GetUsersPayload {
    type?       : string
    keyword?    : string
}

export interface GetUserPayload {
    id : string
}

export interface CreateUserPayload {
    username    : string
    first_name  : string
    last_name   : string
    birthday    : Date | null
    type        : string
    email?      : string
}
