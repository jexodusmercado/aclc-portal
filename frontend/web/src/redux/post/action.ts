import * as types from './types';

export const createPostRequest = (payload: types.CreatePostPayload): types.CreatePostAction => {
    return {
        type: types.CREATE_POST_REQUEST,
        payload
    }
}