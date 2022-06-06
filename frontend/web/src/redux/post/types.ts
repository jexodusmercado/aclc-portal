
export type PostState = typeof PostInitialState;

export const PostInitialState = {
    posts: {
        data: [
            {
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
    }
}

export const CREATE_POST_REQUEST  = "CREATE_POST_REQUEST"
export const CREATE_POST_SUCCESS  = "CREATE_POST_SUCCESS"
export const CREATE_POST_FAILED   = "CREATE_POST_FAILED"


export type CreatePostAction = {
    type: typeof CREATE_POST_REQUEST
    payload: CreatePostPayload
}

export interface CreatePostPayload {
    classroomId:    number
    // title:          string
    // body:           string
    // file:           File | null
    formdata:       FormData
}