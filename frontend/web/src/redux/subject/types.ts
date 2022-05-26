export type SubjectState = typeof  SubjectInitial

export const SubjectInitial = {
    subjects: {
        data: [
            {
                id: 0,
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

export const GET_SUBJECT_REQUEST           = "GET_SUBJECT_REQUEST"
export const GET_SUBJECT_SUCCESS           = "GET_SUBJECT_SUCCESS"
export const GET_SUBJECT_FAILED            = "GET_SUBJECT_FAILED"

export type GetSubjectsAction = {
    type: typeof GET_SUBJECT_REQUEST
    payload: GetSubjectsPayload
}

export interface GetSubjectsPayload {
    keyword: string
}