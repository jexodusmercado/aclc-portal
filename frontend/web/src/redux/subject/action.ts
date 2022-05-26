import * as types from './types'

export const getAllSubjects = ( payload : types.GetSubjectsPayload) : types.GetSubjectsAction => {
    return {
        type: types.GET_SUBJECT_REQUEST,
        payload
    }
}