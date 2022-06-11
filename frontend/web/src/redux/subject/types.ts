export type SubjectState = typeof  SubjectInitial

export const SubjectInitial = {
    subjects: {
        data: [
            {
                ID: 0,
                name: "",
                code: "",
                is_active: false,
                created_at: "",
                updated_at: "",
            }
        ],
        loading: false
    }
}

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

export type GetSubjectsAction = {
    type: typeof GET_SUBJECT_REQUEST
    payload: GetSubjectsPayload
}

export type CreateSubjectAction = {
    type: typeof CREATE_SUBJECT_REQUEST
}

export type UpdateSubjectAction = {
    type: typeof UPDATE_SUBJECT_REQUEST
}

export type DeleteSubjectAction = {
    type: typeof DELETE_SUBJECT_REQUEST
}

export interface GetSubjectsPayload {
    keyword: string
}
