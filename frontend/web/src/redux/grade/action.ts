import * as types from './type'

export const getGradeRequest = (payload: types.GetGradePayload): types.GetGradeAction => {
    return {
        type: types.GET_GRADE_REQUEST,
        payload
    }
}