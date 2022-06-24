import { IPayload } from "interfaces"

/**
 * TYPED STATES
 */
export type UserState           = typeof UserInitialState
export type CreateState         = typeof UserInitialState.created
export type GetAllUsersState    = typeof UserInitialState.users
export type GetUserState        = typeof UserInitialState.user



/**
 * STATES
 */
export const UserInitialState  = {
    users: {
        data: [
            {
                id: 0,
                username: "",
                email: "",
                first_name: "",
                last_name: "",
                birthday: "",
                image: "",
                phone: "",
                type: "",
                is_active: false,
                updated_at: "",
                created_at: "",
                school_year: 0,
                course: {
                    ID: 0,
                    created_at: "",
                    description: "",
                    is_active: false,
                    name: "",
                    updated_at: "",
                },
                classroom: [
                    {
                        body: "",
                        created_at: "",
                        id: 0,
                        subject: {
                            ID: 0,
                            CreatedAt: "",
                            UpdatedAt: "",
                            DeletedAt: null,
                            UserID: 0,
                            name: "",
                            code: "",
                            unit: 0,
                            is_active: false,
                            Classrooms: null
                        },
                        title: "",
                        updated_at: ""
                    }
                ]
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
        phone:"",
        school_year: 0,
        course: {
            ID: 0,
            created_at: "",
            description: "",
            is_active: false,
            name: "",
            updated_at: "",
        },
        loading: false
    },
    created: {
        loading: false,
        success: false
    },
    deleted: {
        loading: false
    },
    updated: {
        loading: false
    }
}

/**
 * CONSTANTS
 */

export const GET_USERS_REQUEST      = "GET_USERS_REQUEST"
export const GET_USERS_SUCCESS      = "GET_USERS_SUCCESS"
export const GET_USERS_FAILED       = "GET_USERS_FAILED"

export const GET_USER_REQUEST       = "GET_USER_REQUEST"
export const GET_USER_SUCCESS       = "GET_USER_SUCCESS"
export const GET_USER_FAILED        = "GET_USER_FAILED"

export const SEARCH_USER_REQUEST    = "SEARCH_USER_REQUEST"
export const SEARCH_USER_SUCCESS    = "SEARCH_USER_SUCCESS"
export const SEARCH_USER_FAILED     = "SEARCH_USER_FAILED"

export const CREATE_USER_REQUEST    = "CREATE_USER_REQUEST"
export const CREATE_USER_SUCCESS    = "CREATE_USER_SUCCESS"
export const CREATE_USER_FAILED     = "CREATE_USER_FAILED"

export const DELETE_USER_REQUEST    = "DELETE_USER_REQUEST"
export const DELETE_USER_SUCCESS    = "DELETE_USER_SUCCESS"
export const DELETE_USER_FAILED     = "DELETE_USER_FAILED"

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
    // username        : string
    // first_name      : string
    // last_name       : string
    // birthday        : Date | null
    type            : string
    // email?          : string
    letter_type     : string
    // course_id?      : number
    // schoolyear_id   : number
    formData      : FormData
}
