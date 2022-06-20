import * as types from './types';

export const createPostRequest = (payload: types.CreatePostPayload): types.CreatePostAction => {
    return {
        type: types.CREATE_POST_REQUEST,
        payload
    }
}

export const deletePostRequest = (payload: types.DeletePostPayload): types.DeletePostAction => {
    return {
        type: types.DELETE_POST_REQUEST,
        payload
    }
}
