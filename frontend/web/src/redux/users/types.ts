import { IPayload } from "interfaces"
import { User } from "./interface"

export type UserState = typeof UserInitialState

/**
 * STATES
 */
export const UserInitialState  = {
    users: [] as User[],
    user: {} as User,
}

/**
 * CONSTANTS
 */

export const GET_USERS              = "GET_USERS"
export const GET_USERS_REQUEST      = "GET_USERS_REQUEST"
export const GET_USERS_SUCCESS      = "GET_USERS_SUCCESS"
export const GET_USERS_FAILED       = "GET_USERS_FAILED"

export const GET_USER               = "GET_USER"
export const GET_USER_REQUEST       = "GET_USER_REQUEST"
export const GET_USER_SUCCESS       = "GET_USER_SUCCESS"
export const GET_USER_FAILED        = "GET_USER_FAILED"

export const SEARCH_USER            = "SEARCH_USER"
export const SEARCH_USER_REQUEST    = "SEARCH_USER_REQUEST"
export const SEARCH_USER_SUCCESS    = "SEARCH_USER_SUCCESS"
export const SEARCH_USER_FAILED     = "SEARCH_USER_FAILED"

export const CREATE_USER            = "CREATE_USER"
export const CREATE_USER_REQUEST    = "CREATE_USER_REQUEST"
export const CREATE_USER_SUCCESS    = "CREATE_USER_SUCCESS"
export const CREATE_USER_FAILED     = "CREATE_USER_FAILED"

export const DELETE_USER            = "DELETE_USER"
export const DELETE_USER_REQUEST    = "DELETE_USER_REQUEST"
export const DELETE_USER_SUCCESS    = "DELETE_USER_SUCCESS"
export const DELETE_USER_FAILED     = "DELETE_USER_FAILED"

export const UPDATE_USER            = "UPDATE_USER"
export const UPDATE_USER_REQUEST    = "UPDATE_USER_REQUEST"
export const UPDATE_USER_SUCCESS    = "UPDATE_USER_SUCCESS"
export const UPDATE_USER_FAILED     = "UPDATE_USER_FAILED"

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
    type        : typeof CREATE_USER_REQUEST
    payload     : CreateUserPayload
}

export type DeleteUserAction = {
    type        : typeof DELETE_USER_REQUEST
    payload     : DeleteUsersPayload
}

export type UpdateUserAction = {
    type        : typeof UPDATE_USER_REQUEST
    payload     : UpdateUserPayload
}

/**
 * INTERFACES
 */

export interface GetUsersPayload {
    type?       : string
    keyword?    : string
    course_id?  : string
}

export interface GetUserPayload extends IPayload {
    id : string
}

export interface DeleteUsersPayload extends IPayload {
    ids : string[]
}

export interface UpdateUserPayload extends IPayload, Partial<CreateUserPayload> {
    id: string
}

export interface CreateUserPayload extends IPayload {
    type            : string
    letter_type     : string
    formData      : FormData
}
