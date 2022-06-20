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
            full_name: "",
            is_active : false,
            last_name : "",
            image: "",
            phone: "",
            type : "",
            updated_at : "",
            username : "",
            schoolyear: "",
            student_count: 0,
            classes: [
                {
                    body: "",
                    created_at: "",
                    id: 0,
                    students: [
                        {
                        birthday: "",
                        email: "",
                        first_name: "",
                        full_name: "",
                        id: 3,
                        image: "",
                        last_name: "",
                        phone: "",
                        type: "",
                        username: ""
                        },
                    ],
                    subject: {
                        ID: 0,
                        code: "",
                        created_at: "",
                        is_active: false,
                        name: "",
                        unit: 0,
                        updated_at: ""
                    },
                    title: "",
                    updated_at: "",
                }
            ]
            
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
