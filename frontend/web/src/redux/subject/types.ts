import { IPayload } from "interfaces"

export type SubjectState = typeof  SubjectInitial
export type SubjectsDataState = typeof  SubjectInitial.subjects

export const SubjectInitial = {
    subjects: {
        data: [
            {
                ID: 0,
                name: "",
                code: "",
                unit: 0,
                is_active: false,
                created_at: "",
                updated_at: "",
            }
        ],
        loading: false
    },
    subject: {
        data: {
            ID: 0,
            name: "",
            code: "",
            unit: 0,
            is_active: false,
            created_at: "",
            updated_at: ""
        },
        loading: false
    },
    created: {
        loading: false
    },
    updated: {
        loading: false
    },
    deleted: {
        loading: false
    }
}

export const GET_ALL_SUBJECT_REQUEST    = "GET_ALL_SUBJECT_REQUEST"
export const GET_ALL_SUBJECT_SUCCESS    = "GET_ALL_SUBJECT_SUCCESS"
export const GET_ALL_SUBJECT_FAILED     = "GET_ALL_SUBJECT_FAILED"

export const GET_SUBJECT_REQUEST        = "GET_SUBJECT_REQUEST"
export const GET_SUBJECT_SUCCESS        = "GET_SUBJECT_SUCCESS"
export const GET_SUBJECT_FAILED         = "GET_SUBJECT_FAILED"

export const CREATE_SUBJECT_REQUEST     = "CREATE_SUBJECT_REQUEST"
export const CREATE_SUBJECT_SUCCESS     = "CREATE_SUBJECT_SUCCESS"
export const CREATE_SUBJECT_FAILED      = "CREATE_SUBJECT_FAILED"

export const UPDATE_SUBJECT_REQUEST     = "UPDATE_SUBJECT_REQUEST"
export const UPDATE_SUBJECT_SUCCESS     = "UPDATE_SUBJECT_SUCCESS"
export const UPDATE_SUBJECT_FAILED      = "UPDATE_SUBJECT_FAILED"

export const DELETE_SUBJECT_REQUEST     = "DELETE_SUBJECT_REQUEST"
export const DELETE_SUBJECT_SUCCESS     = "DELETE_SUBJECT_SUCCESS"
export const DELETE_SUBJECT_FAILED      = "DELETE_SUBJECT_FAILED"

export type GetAllSubjectAction = {
    type: typeof GET_ALL_SUBJECT_REQUEST
    payload: GetAllSubjectPayload
}

export type GetSubjectAction = {
    type: typeof GET_SUBJECT_REQUEST
    payload: GetSubjectPayload
}

export type CreateSubjectAction = {
    type: typeof CREATE_SUBJECT_REQUEST
    payload: CreateSubjectsPayload
}

export type UpdateSubjectAction = {
    type: typeof UPDATE_SUBJECT_REQUEST
    payload: UpdateSubjectPayload
}

export type DeleteSubjectAction = {
    type: typeof DELETE_SUBJECT_REQUEST
    payload: DeleteSubjectPayload
}

export interface GetAllSubjectPayload {
    keyword: string
}

export interface GetSubjectPayload {
    id: string
}

export interface CreateSubjectsPayload extends IPayload {
    name : string
    code : string
    unit : number
}

export interface UpdateSubjectPayload extends IPayload, Partial<CreateSubjectsPayload> {
    id: string
}

export interface DeleteSubjectPayload extends IPayload {
    id: string
}