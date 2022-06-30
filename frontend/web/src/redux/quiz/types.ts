import { IPayload } from "interfaces"
import { QuizData } from "./interfaces"

export type quizInitialType = typeof quizInitialState 

export const quizInitialState = {
    quizzes: [] as QuizData[],
    quiz: {} as QuizData,
}

export const GET_ALL_QUIZ                           = "GET_ALL_QUIZ"
export const GET_ALL_QUIZ_REQUEST                   = "GET_ALL_QUIZ_REQUEST"
export const GET_ALL_QUIZ_SUCCESS                   = "GET_ALL_QUIZ_SUCCESS"
export const GET_ALL_QUIZ_FAILED                    = "GET_ALL_QUIZ_FAILED"


export const GET_ALL_QUIZ_BY_CLASSROOM_ID           = "GET_ALL_QUIZ_BY_CLASSROOM_ID"
export const GET_ALL_QUIZ_BY_CLASSROOM_ID_REQUEST   = "GET_ALL_QUIZ_BY_CLASSROOM_ID_REQUEST"
export const GET_ALL_QUIZ_BY_CLASSROOM_ID_SUCCESS   = "GET_ALL_QUIZ_BY_CLASSROOM_ID_SUCCESS"
export const GET_ALL_QUIZ_BY_CLASSROOM_ID_FAILED    = "GET_ALL_QUIZ_BY_CLASSROOM_ID_FAILED"

export const GET_ALL_QUIZ_BY_CREATOR_ID             = "GET_ALL_QUIZ_BY_CREATOR_ID"
export const GET_ALL_QUIZ_BY_CREATOR_ID_REQUEST     = "GET_ALL_QUIZ_BY_CREATOR_ID_REQUEST"
export const GET_ALL_QUIZ_BY_CREATOR_ID_SUCCESS     = "GET_ALL_QUIZ_BY_CREATOR_ID_SUCCESS"
export const GET_ALL_QUIZ_BY_CREATOR_ID_FAILED      = "GET_ALL_QUIZ_BY_CREATOR_ID_FAILED"

export const GET_QUIZ                               = "GET_QUIZ"
export const GET_QUIZ_REQUEST                       = "GET_QUIZ_REQUEST"
export const GET_QUIZ_SUCCESS                       = "GET_QUIZ_SUCCESS"
export const GET_QUIZ_FAILED                        = "GET_QUIZ_FAILED"

export const CREATE_QUIZ                            = "CREATE_QUIZ"
export const CREATE_QUIZ_REQUEST                    = "CREATE_QUIZ_REQUEST"
export const CREATE_QUIZ_SUCCESS                    = "CREATE_QUIZ_SUCCESS"
export const CREATE_QUIZ_FAILED                     = "CREATE_QUIZ_FAILED"

export const UPDATE_QUIZ                            = "UPDATE_QUIZ"
export const UPDATE_QUIZ_REQUEST                    = "UPDATE_QUIZ_REQUEST"
export const UPDATE_QUIZ_SUCCESS                    = "UPDATE_QUIZ_SUCCESS"
export const UPDATE_QUIZ_FAILED                     = "UPDATE_QUIZ_FAILED"

export type getAllQuizzesByClassroomIDAction = {
    type: typeof GET_ALL_QUIZ_BY_CLASSROOM_ID_REQUEST
    payload: IDPayload
}

export type getAllQuizByCreatorIDAction = {
    type: typeof GET_ALL_QUIZ_BY_CREATOR_ID_REQUEST
    payload: IDPayload
}

export type createQuizAction = {
    type: typeof CREATE_QUIZ_REQUEST
    payload: createQuizPayload
}

export type updateQuizAction = {
    type: typeof UPDATE_QUIZ_REQUEST
    payload: updateQuizPayload
}

export interface createQuizPayload extends IPayload {
    creator_id:     number
    classroom_id:   number
    end_date:       string
    grade_period:   string
}

export interface updateQuizPayload extends IPayload, Partial<createQuizPayload> {
    id: number
}

export interface IDPayload {
    id: number
}
