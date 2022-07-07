import { string } from "yup"
import { AuthUser, AuthState } from "./interface"

export const initialState:AuthState = {
    user: {} as AuthUser,
    authenticated: false
}

export const LOGIN          = "LOGIN"
export const LOGIN_REQUEST  = "LOGIN_REQUEST"
export const LOGIN_SUCCESS  = "LOGIN_SUCCESS"
export const LOGIN_FAILED   = "LOGIN_FAILED"

export const LOGOUT             = "LOGOUT"
export const LOGOUT_REQUEST     = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS     = "LOGOUT_SUCCESS"
export const LOGOUT_FAILED      = "LOGOUT_FAILED"

export const FETCH_USER             = "FETCH_USER"
export const FETCH_USER_REQUEST     = "FETCH_USER_REQUEST"
export const FETCH_USER_SUCCESS     = "FETCH_USER_SUCCESS"
export const FETCH_USER_FAILED      = "FETCH_USER_FAILED"

export type LoginAction = {
    type        : typeof LOGIN_REQUEST
    payload     : LoginPayload
}

export type LogoutAction = {
    type        : typeof LOGOUT_REQUEST
}

export type FetchUserAction = {
    type        : typeof FETCH_USER_REQUEST,
    payload     : FetchUserPayload
}

export interface LoginPayload {
    username    : string
    password    : string
}

export interface FetchUserPayload {
    id: string
}