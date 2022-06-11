import * as types from './types'

export const createCommentRequest = (payload: types.CreateUpdatePayload): types.CreateCommentAction => {
    return {
        type: types.CREATE_COMMENT_REQUEST,
        payload
    }
}

export const updateCommentRequest = (payload: types.CreateUpdatePayload): types.UpdateCommentAction => {
    return {
        type: types.UPDATE_COMMENT_REQUEST,
        payload
    }
}

export const deleteCommentRequest = (payload: types.GetDeletePayload): types.DeleteCommentAction => {
    return {
        type: types.DELETE_COMMENT_REQUEST,
        payload
    }
}

export const getCommentsRequest = (payload: types.GetDeletePayload): types.GetCommentAction => {
    return {
        type: types.GET_COMMENT_REQUEST,
        payload
    }
}