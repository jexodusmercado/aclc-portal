export const initialState : AuthState = {
    user: {} as AuthUser,
    authenticated: false,
    error: {} as Error,
    loading: false
}
export interface AuthState {
    user:          AuthUser
    error:         Error;
    authenticated: boolean;
    loading:       boolean;
}

export interface Error {
    status:  number;
    message: string;
}

export interface AuthUser {
    id:            number;
    birthday:      string;
    created_at:    string;
    email:         string;
    first_name:    string;
    full_name:     string;
    is_active:     boolean;
    last_name:     string;
    image:         string;
    phone:         string;
    type:          string;
    updated_at:    string;
    username:      string;
    schoolyear:    string;
    student_count: number;
    classes:       Class[];
}

export interface Class {
    body:       string;
    created_at: string;
    id:         number;
    students:   Student[];
    subject:    Subject;
    title:      string;
    updated_at: string;
}

export interface Student {
    birthday:   string;
    email:      string;
    first_name: string;
    full_name:  string;
    id:         number;
    image:      string;
    last_name:  string;
    phone:      string;
    type:       string;
    username:   string;
}

export interface Subject {
    ID:         number;
    code:       string;
    created_at: string;
    is_active:  boolean;
    name:       string;
    unit:       number;
    updated_at: string;
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
