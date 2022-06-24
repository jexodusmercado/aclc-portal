export type quizDataState = typeof quizInitialState.quiz.data
export type quizzesState  = typeof quizInitialState.quizzes.data

export const quizInitialState = {
    quizzes: {
        data: [ 
            {
                end_date: "",
                grade_period_id: 0,
                id: 0,
                is_published: false,
                updated_at: "",
                created_at: "",
                classroom: {
                    body: "",
                    created_at: "",
                    id: 0,
                    title: "",
                    updated_at: ""
                },
                contents: [
                    {
                        id: 0,
                        quiz_id: 0,
                        answer: "",
                        question: "",
                        user_input: "",
                        question_type: "",
                        created_at: "",
                        updated_at: "",
                    },
                   
                ],
                created_by: {
                    id: 0,
                    birthday: "",
                    email: "",
                    full_name: "",
                    first_name: "",
                    last_name: "",
                    username: "",
                    image: "",
                    phone: "",
                    type: ""
                },
                students: [
                    {
                        id: 0,
                        birthday: "",
                        email: "",
                        first_name: "",
                        last_name: "",
                        full_name: "",
                        username: "",
                        image: "",
                        phone: "",
                        type: ""
                    }
                ],
                subject: {
                    ID: 2,
                    code: "FP101",
                    created_at: "2022-06-18T09:06:41.708Z",
                    is_active: true,
                    name: "Filipino",
                    unit: 2,
                    updated_at: "2022-06-18T09:06:41.708Z"
                }
            }
        ],
        loading: false
    },
    quiz: {
        data: {
            end_date: "2022-06-19",
            grade_period_id: 69,
            id: 2,
            is_published: true,
            updated_at: "2022-06-19T16:14:12.951Z",
            created_at: "2022-06-18T18:09:09.167Z",
            classroom: {
                body: "Monyayu",
                created_at: "2022-06-18T10:54:35.665Z",
                id: 18,
                title: "Chupapi",
                updated_at: "2022-06-19T19:52:48.143Z"
            },
            contents: [
                {
                    answer: "hyper text markup language",
                    created_at: "2022-06-19T14:31:01.364Z",
                    id: 1,
                    question: "What is HTML?",
                    question_type: "identification",
                    quiz_id: 2,
                    updated_at: "2022-06-19T16:14:12.973Z",
                    user_input: "p etch p"
                },
            ],
            created_by: {
                birthday: "2022-06-18",
                email: "",
                first_name: "Jefferson",
                full_name: "Jefferson test",
                id: 2,
                image: "public/4502a16d-f01f-44d7-93be-53cce6f5c720.jpeg",
                last_name: "test",
                phone: "09353311151",
                type: "FACULTY",
                username: "1112"
            },
            students: [
                {
                    birthday: "1994-12-17",
                    email: "",
                    first_name: "ACLC",
                    full_name: "ACLC Admin",
                    id: 1,
                    image: "",
                    last_name: "Admin",
                    phone: "",
                    type: "ADMIN",
                    username: "11109111"
                }
            ],
            subject: {
                ID: 2,
                code: "FP101",
                created_at: "2022-06-18T09:06:41.708Z",
                is_active: true,
                name: "Filipino",
                unit: 2,
                updated_at: "2022-06-18T09:06:41.708Z"
            }
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

export const GET_ALL_QUIZ_REQUEST           = "GET_ALL_QUIZ_REQUEST"
export const GET_ALL_QUIZ_SUCCESS           = "GET_ALL_QUIZ_SUCCESS"
export const GET_ALL_QUIZ_FAILED            = "GET_ALL_QUIZ_FAILED"

export const GET_QUIZ_REQUEST               = "GET_QUIZ_REQUEST"
export const GET_QUIZ_SUCCESS               = "GET_QUIZ_SUCCESS"
export const GET_QUIZ_FAILED                = "GET_QUIZ_FAILED"

export const CREATE_QUIZ_REQUEST           = "CREATE_QUIZ_REQUEST"
export const CREATE_QUIZ_SUCCESS           = "CREATE_QUIZ_SUCCESS"
export const CREATE_QUIZ_FAILED            = "CREATE_QUIZ_FAILED"

export const UPDATE_QUIZ_REQUEST           = "UPDATE_QUIZ_REQUEST"
export const UPDATE_QUIZ_SUCCESS           = "UPDATE_QUIZ_SUCCESS"
export const UPDATE_QUIZ_FAILED            = "UPDATE_QUIZ_FAILED"

export interface getAllQuizAction {
    type: typeof GET_ALL_QUIZ_REQUEST
}

export interface getQuizAction {
    type: typeof GET_QUIZ_REQUEST
}

export interface createQuizAction {
    type: typeof CREATE_QUIZ_REQUEST
}

export interface updateQuizRequest {
    type: typeof UPDATE_QUIZ_REQUEST
}