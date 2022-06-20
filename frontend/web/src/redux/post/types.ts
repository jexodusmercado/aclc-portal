import { IPayload } from "interfaces";
import { initialState as CommentInitialState } from "redux/comment/types";
export type PostState = typeof PostInitialState;

export type PostDataState = typeof PostInitialState.posts.data[0]

const CommentState = CommentInitialState.comments.data

export const PostInitialState = {
    posts: {
        data: [
            {
                author: {
                    id: 0,
                    birthday: "",
                    email: "",
                    full_name: "",
                    type: "",
                    username: ""
                },
                comments: CommentState, 
                body: "",
                created_at: "",
                extension: "",
                filename: "",
                id: 2,
                is_active: false,
                title: "",
                updated_at: "",
                user_id: 1
            }
        ],
        loading: false
    },
    post: {
        data: {
            author: {
                birthday: "",
                created_at: "",
                email: "",
                first_name: "",
                id: 1,
                is_active: true,
                last_name: "",
                type: "",
                updated_at: "",
                username: ""
            },
            body: "",
            created_at: "",
            extension: "",
            filename: "",
            id: 0,
            is_active: false,
            title: "",
            updated_at: "",
            user_id: 0
        },
        loading: false
    },
    created: {
        loading: false
    },
    deleted: {
        loading: false
    }
}

export const CREATE_POST_REQUEST  = "CREATE_POST_REQUEST"
export const CREATE_POST_SUCCESS  = "CREATE_POST_SUCCESS"
export const CREATE_POST_FAILED   = "CREATE_POST_FAILED"

export const DELETE_POST_REQUEST  = "DELETE_POST_REQUEST"
export const DELETE_POST_SUCCESS  = "DELETE_POST_SUCCESS"
export const DELETE_POST_FAILED   = "DELETE_POST_FAILED"


export type CreatePostAction = {
    type: typeof CREATE_POST_REQUEST
    payload: CreatePostPayload
}

export type DeletePostAction = {
    type: typeof DELETE_POST_REQUEST
    payload: DeletePostPayload
}

export interface CreatePostPayload extends IPayload {
    classroomId:    number
    formdata:       FormData
}

export interface DeletePostPayload extends IPayload {
    classroomId:    string
    postId:         string
}