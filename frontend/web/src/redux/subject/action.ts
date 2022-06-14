import * as types from './types'

export const getAllSubjects = ( payload : types.GetAllSubjectPayload) : types.GetAllSubjectAction => {
    return {
        type: types.GET_ALL_SUBJECT_REQUEST,
        payload
    }
}

export const getSubject = ( payload : types.GetSubjectPayload) : types.GetSubjectAction => {
    return {
        type: types.GET_SUBJECT_REQUEST,
        payload
    }
}

export const createSubject = ( payload: types.CreateSubjectsPayload) : types.CreateSubjectAction => {
    return {
        type: types.CREATE_SUBJECT_REQUEST,
        payload
    }
}

export const updateSubject = ( payload: types.UpdateSubjectPayload) : types.UpdateSubjectAction => {
    return {
        type: types.UPDATE_SUBJECT_REQUEST,
        payload
    }
}

export const deleteSubject = ( payload: types.DeleteSubjectPayload) : types.DeleteSubjectAction => {
    return {
        type: types.DELETE_SUBJECT_REQUEST,
        payload
    }
}