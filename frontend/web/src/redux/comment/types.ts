import { IPayload } from "interfaces";

export type CommentState = typeof initialState;

export const initialState = {
    comments: {
        data: [
            {
                id: 0,
                message: "",
                post_id: 0,
                updated_at: "",
                created_at: "",
                user: {
                    id: 0,
                    birthday: "",
                    email: "",
                    full_name: "",
                    type: "",
                    username: ""
                }
            }
        ],
        loading: false
    }
}

export const CREATE_COMMENT_REQUEST     = "CREATE_COMMENT_REQUEST"
export const CREATE_COMMENT_SUCCESS     = "CREATE_COMMENT_SUCCESS"
export const CREATE_COMMENT_FAILED      = "CREATE_COMMENT_FAILED"

export const GET_COMMENT_REQUEST        = "GET_COMMENT_REQUEST"
export const GET_COMMENT_SUCCESS        = "GET_COMMENT_SUCCESS"
export const GET_COMMENT_FAILED         = "GET_COMMENT_FAILED"

export const UPDATE_COMMENT_REQUEST     = "UPDATE_COMMENT_REQUEST"
export const UPDATE_COMMENT_SUCCESS     = "UPDATE_COMMENT_SUCCESS"
export const UPDATE_COMMENT_FAILED      = "UPDATE_COMMENT_FAILED"

export const DELETE_COMMENT_REQUEST     = "DELETE_COMMENT_REQUEST"
export const DELETE_COMMENT_SUCCESS     = "DELETE_COMMENT_SUCCESS"
export const DELETE_COMMENT_FAILED      = "DELETE_COMMENT_FAILED"

export interface CreateUpdatePayload extends IPayload {
    postId?:     number
    commentId?:  number
    message:    string
}

export interface GetDeletePayload extends IPayload {
    postId?:     number
    commentId?:  number
}

export type CreateCommentAction = {
    type: typeof CREATE_COMMENT_REQUEST,
    payload: CreateUpdatePayload
}

export type UpdateCommentAction = {
    type: typeof UPDATE_COMMENT_REQUEST,
    payload: CreateUpdatePayload
}

export type GetCommentAction = {
    type: typeof GET_COMMENT_REQUEST,
    payload: GetDeletePayload
}

export type DeleteCommentAction = {
    type: typeof DELETE_COMMENT_REQUEST,
    payload: GetDeletePayload
}