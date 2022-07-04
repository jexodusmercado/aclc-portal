import { AxiosError, AxiosResponse } from 'axios'
import { quizContentRequest, quizRequest } from 'services/request'
import { handleAxiosError } from 'utility'
import * as types from './types'
import { 
    call,
    ForkEffect,
    put,
    takeLatest
} from 'redux-saga/effects'


function* GetAllQuizzesByClassroomID({payload}: types.getAllQuizzesByClassroomIDAction) {
    try {
        const response: AxiosResponse = yield call(quizRequest.getAllByClassroomID, payload)

        yield put({
            type: types.GET_ALL_QUIZ_BY_CLASSROOM_ID_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_ALL_QUIZ_BY_CLASSROOM_ID_FAILED,
            payload
        })
    }
}

function* GetAllQuizByCreatorID({payload}: types.getAllQuizByCreatorIDAction) {
    try {

        const response: AxiosResponse = yield call(quizRequest.getAllByCreatorID, payload)

        yield put({
            type: types.GET_ALL_QUIZ_BY_CREATOR_ID_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_ALL_QUIZ_BY_CREATOR_ID_FAILED,
            payload
        })
    }
}

function* GetQuizByID({payload}: types.getQuizByIDAction) {
    try {

        const response: AxiosResponse = yield call(quizRequest.getByID, payload)

        yield put({
            type: types.GET_QUIZ_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_QUIZ_FAILED,
            payload
        })
    }
}

function* CreateQuiz({payload}: types.createQuizAction) {
    try {
        yield call(quizRequest.createQuiz, payload)

        yield put({
            type: types.CREATE_QUIZ_SUCCESS,
        })

        if(payload.onSuccess){
            payload.onSuccess()
        }

    } catch (error) {
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_QUIZ_FAILED,
            err
        })

        if(payload.onFailed){
            payload.onFailed()
        }
        
    }
}

function* UpdateQuiz({payload} : types.updateQuizAction) {
    try {

        yield call(quizRequest.updateQuiz, payload)

        yield put({
            type: types.UPDATE_QUIZ_SUCCESS,
        })

        if(payload.onSuccess){
            payload.onSuccess()
        }
        
    } catch (error) {

        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.UPDATE_QUIZ_FAILED,
            err
        })

        if(payload.onFailed){
            payload.onFailed()
        }

    }
}

function* DeleteContent({payload} : types.deleteQuizContentAction) {
    const {onSuccess, onFailed, ...data} = payload

    try {
        yield call(quizContentRequest.deleteQuizContent, data)

        yield put({
            type: types.DELETE_QUIZ_CONTENT_SUCCESS
        })

        if(onSuccess){
            onSuccess()
        }
        
    } catch (error) {

        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.DELETE_QUIZ_CONTENT_FAILED,
            err
        })

        if(onFailed){
            onFailed()
        }

    }
}

function* CreateQuizContent({payload}: types.createQuizContentAction) {
    try {
       
        yield call(quizContentRequest.createContent, payload)

        yield put({
            type: types.CREATE_QUIZ_CONTENT_SUCCESS
        })
        
        if(payload.onSuccess){
            payload.onSuccess()
        }

    } catch (error) {
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_QUIZ_CONTENT_FAILED,
            err
        })

        if(payload.onFailed){
            payload.onFailed()
        }
        
    }
}

function* UpdateQuizContent({payload}: types.updateQuizAction) {
    try {
        yield call(quizContentRequest.updateQuizContent, payload)

        yield put({
            type: types.UPDATE_QUIZ_CONTENT_SUCCESS
        })

        if(payload.onSuccess) {
            payload.onSuccess()
        }
    } catch (error) {
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.UPDATE_QUIZ_CONTENT_FAILED,
            err
        })

        if(payload.onFailed){
            payload.onFailed()
        }
    }
}

function* GetQuizContent({payload}: types.getQuizContentAction){
    try {
        const response : AxiosResponse = yield call(quizContentRequest.getQuizContent, payload)

        yield put({
            type: types.GET_QUIZ_CONTENT_SUCCESS,
            payload: response.data
        })

        if(payload.onSuccess){
            payload.onSuccess()
        }

    } catch (error) {
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_QUIZ_CONTENT_FAILED,
            err
        })

        if(payload.onFailed){
            payload.onFailed()
        }
    }
}

function* DeleteQuiz({payload}: types.deleteQuizAction){
    try {
        yield call(quizRequest.deleteQuiz, payload)

        yield put({
            type: types.DELETE_QUIZ_SUCCESS,
            payload
        })

        if(payload.onSuccess){
            payload.onSuccess()
        }

    } catch (error) {
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.DELETE_QUIZ_FAILED,
            err
        })

        if(payload.onFailed){
            payload.onFailed()
        }
    }
}


const QuizSaga: ForkEffect[] = [
    takeLatest(types.GET_ALL_QUIZ_BY_CLASSROOM_ID_REQUEST, GetAllQuizzesByClassroomID),
    takeLatest(types.GET_ALL_QUIZ_BY_CREATOR_ID_REQUEST, GetAllQuizByCreatorID),
    takeLatest(types.DELETE_QUIZ_CONTENT_REQUEST, DeleteContent),
    takeLatest(types.CREATE_QUIZ_REQUEST, CreateQuiz),
    takeLatest(types.UPDATE_QUIZ_REQUEST, UpdateQuiz),
    takeLatest(types.GET_QUIZ_REQUEST, GetQuizByID),
    takeLatest(types.GET_QUIZ_CONTENT_REQUEST, GetQuizContent),
    takeLatest(types.CREATE_QUIZ_CONTENT_REQUEST, CreateQuizContent),
    takeLatest(types.UPDATE_QUIZ_CONTENT_REQUEST, UpdateQuizContent),
    takeLatest(types.DELETE_QUIZ_REQUEST, DeleteQuiz)
]

export default QuizSaga