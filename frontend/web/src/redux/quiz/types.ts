import { IPayload } from "interfaces"
import { Content, QuizData } from "./interfaces"

export type quizInitialType = typeof quizInitialState 

export const quizInitialState = {
    quizzes: [] as QuizData[],
    quiz: {} as QuizData,
    content: {} as Content
}

export const GET_ALL_QUIZ                           = "GET_ALL_QUIZ"
export const GET_ALL_QUIZ_REQUEST                   = "GET_ALL_QUIZ_REQUEST"
export const GET_ALL_QUIZ_SUCCESS                   = "GET_ALL_QUIZ_SUCCESS"
export const GET_ALL_QUIZ_FAILED                    = "GET_ALL_QUIZ_FAILED"

export const GET_QUIZ_CONTENT                       = "GET_QUIZ_CONTENT"
export const GET_QUIZ_CONTENT_REQUEST               = "GET_QUIZ_CONTENT_REQUEST"
export const GET_QUIZ_CONTENT_SUCCESS               = "GET_QUIZ_CONTENT_SUCCESS"
export const GET_QUIZ_CONTENT_FAILED                = "GET_QUIZ_CONTENT_FAILED"

export const GET_ALL_QUIZ_BY_CLASSROOM_ID           = "GET_ALL_QUIZ_BY_CLASSROOM_ID"
export const GET_ALL_QUIZ_BY_CLASSROOM_ID_REQUEST   = "GET_ALL_QUIZ_BY_CLASSROOM_ID_REQUEST"
export const GET_ALL_QUIZ_BY_CLASSROOM_ID_SUCCESS   = "GET_ALL_QUIZ_BY_CLASSROOM_ID_SUCCESS"
export const GET_ALL_QUIZ_BY_CLASSROOM_ID_FAILED    = "GET_ALL_QUIZ_BY_CLASSROOM_ID_FAILED"

export const GET_ALL_QUIZ_BY_CREATOR_ID             = "GET_ALL_QUIZ_BY_CREATOR_ID"
export const GET_ALL_QUIZ_BY_CREATOR_ID_REQUEST     = "GET_ALL_QUIZ_BY_CREATOR_ID_REQUEST"
export const GET_ALL_QUIZ_BY_CREATOR_ID_SUCCESS     = "GET_ALL_QUIZ_BY_CREATOR_ID_SUCCESS"
export const GET_ALL_QUIZ_BY_CREATOR_ID_FAILED      = "GET_ALL_QUIZ_BY_CREATOR_ID_FAILED"

export const CREATE_QUIZ_CONTENT                    = "CREATE_QUIZ_CONTENT"
export const CREATE_QUIZ_CONTENT_REQUEST            = "CREATE_QUIZ_CONTENT_REQUEST"
export const CREATE_QUIZ_CONTENT_SUCCESS            = "CREATE_QUIZ_CONTENT_SUCCESS"
export const CREATE_QUIZ_CONTENT_FAILED             = "CREATE_QUIZ_CONTENT_FAILED"

export const UPDATE_QUIZ_CONTENT                    = "UPDATE_QUIZ_CONTENT"
export const UPDATE_QUIZ_CONTENT_REQUEST            = "UPDATE_QUIZ_CONTENT_REQUEST"
export const UPDATE_QUIZ_CONTENT_SUCCESS            = "UPDATE_QUIZ_CONTENT_SUCCESS"
export const UPDATE_QUIZ_CONTENT_FAILED             = "UPDATE_QUIZ_CONTENT_FAILED"

export const GET_QUIZ                               = "GET_QUIZ"
export const GET_QUIZ_REQUEST                       = "GET_QUIZ_REQUEST"
export const GET_QUIZ_SUCCESS                       = "GET_QUIZ_SUCCESS"
export const GET_QUIZ_FAILED                        = "GET_QUIZ_FAILED"

export const GET_RANDOM_QUIZ_CONTENT                = "GET_RANDOM_QUIZ_CONTENT"
export const GET_RANDOM_QUIZ_CONTENT_REQUEST        = "GET_RANDOM_QUIZ_CONTENT_REQUEST"
export const GET_RANDOM_QUIZ_CONTENT_SUCCESS        = "GET_RANDOM_QUIZ_CONTENT_SUCCESS"
export const GET_RANDOM_QUIZ_CONTENT_FAILED         = "GET_RANDOM_QUIZ_CONTENT_FAILED"

export const CREATE_QUIZ                            = "CREATE_QUIZ"
export const CREATE_QUIZ_REQUEST                    = "CREATE_QUIZ_REQUEST"
export const CREATE_QUIZ_SUCCESS                    = "CREATE_QUIZ_SUCCESS"
export const CREATE_QUIZ_FAILED                     = "CREATE_QUIZ_FAILED"

export const UPDATE_QUIZ                            = "UPDATE_QUIZ"
export const UPDATE_QUIZ_REQUEST                    = "UPDATE_QUIZ_REQUEST"
export const UPDATE_QUIZ_SUCCESS                    = "UPDATE_QUIZ_SUCCESS"
export const UPDATE_QUIZ_FAILED                     = "UPDATE_QUIZ_FAILED"

export const DELETE_QUIZ_CONTENT                    = "DELETE_QUIZ_CONTENT"
export const DELETE_QUIZ_CONTENT_REQUEST            = "DELETE_QUIZ_CONTENT_REQUEST"
export const DELETE_QUIZ_CONTENT_SUCCESS            = "DELETE_QUIZ_CONTENT_SUCCESS"
export const DELETE_QUIZ_CONTENT_FAILED             = "DELETE_QUIZ_CONTENT_FAILED"

export const DELETE_QUIZ                            = "DELETE_QUIZ"
export const DELETE_QUIZ_REQUEST                    = "DELETE_QUIZ_REQUEST"
export const DELETE_QUIZ_SUCCESS                    = "DELETE_QUIZ_SUCCESS"
export const DELETE_QUIZ_FAILED                     = "DELETE_QUIZ_FAILED"

export const ANSWER_QUIZ_CONTENT                            = "ANSWER_QUIZ_CONTENT"
export const ANSWER_QUIZ_CONTENT_REQUEST                    = "ANSWER_QUIZ_CONTENT_REQUEST"
export const ANSWER_QUIZ_CONTENT_SUCCESS                    = "ANSWER_QUIZ_CONTENT_SUCCESS"
export const ANSWER_QUIZ_CONTENT_FAILED                     = "ANSWER_QUIZ_CONTENT_FAILED"

export type AnswerQuizContentAction = {
    type: typeof ANSWER_QUIZ_CONTENT_REQUEST,
    payload: AnswerQuizContentPayload
}

export type getAllQuizzesByClassroomIDAction = {
    type: typeof GET_ALL_QUIZ_BY_CLASSROOM_ID_REQUEST
    payload: IDPayload
}

export type getRandomQuizContentByQuizID = {
    type: typeof GET_RANDOM_QUIZ_CONTENT_REQUEST
    payload: IDPayload
}

export type getAllQuizByCreatorIDAction = {
    type: typeof GET_ALL_QUIZ_BY_CREATOR_ID_REQUEST
    payload: IDPayload
}

export type createQuizContentAction = {
    type: typeof CREATE_QUIZ_CONTENT_REQUEST,
    payload: CreateContentPayload
}

export type getQuizByIDAction = {
    type: typeof GET_QUIZ_REQUEST,
    payload: IDPayload
}

export type getQuizContentAction = {
    type: typeof GET_QUIZ_CONTENT_REQUEST,
    payload: QuizIDAndContentIDPayload
}

export type createQuizAction = {
    type: typeof CREATE_QUIZ_REQUEST
    payload: createQuizPayload
}

export type updateQuizAction = {
    type: typeof UPDATE_QUIZ_REQUEST
    payload: updateQuizPayload
}

export type deleteQuizAction = {
    type: typeof DELETE_QUIZ_REQUEST
    payload: IDSPayload
}

export type deleteQuizContentAction = {
    type: typeof DELETE_QUIZ_CONTENT_REQUEST
    payload: QuizIDWithContentIDPayload
}

export type updateQuizContentAction = {
    type: typeof UPDATE_QUIZ_CONTENT_REQUEST
    payload: updateQuizPayload
}

export interface AnswerQuizContentPayload {
    quizID: string
    contentID: string
    user_input: string
}

export interface createQuizPayload extends IPayload {
    creator_id:     number
    classroom_id:   number
    end_date:       string
    grade_period:   string
    is_published?:  boolean
}

export interface updateQuizPayload extends IPayload, Partial<createQuizPayload> {
    id: string
}

export interface IDPayload {
    id: number
}

export interface IDSPayload extends IPayload {
    id: number[]
}

export interface ContentPayload {
    question:   string
    answer:     string
}

export interface CreateContentPayload extends IPayload {
    form: ContentPayload[]
    quizId: number
}

export interface QuizIDWithContentIDPayload extends IDPayload, IPayload {
    contentID: number[]
}

export interface QuizIDAndContentIDPayload extends IDPayload, IPayload {
    contentID: number
}

export interface UpdateContentPayload extends ContentPayload, IDPayload {
    content: number
}