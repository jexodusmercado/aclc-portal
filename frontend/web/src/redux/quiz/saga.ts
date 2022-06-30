import { AxiosError, AxiosResponse } from 'axios'
import { quizRequest } from 'services/request'
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
            type: types.UPDATE_QUIZ_REQUEST,
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



const QuizSaga: ForkEffect[] = [
    takeLatest(types.GET_ALL_QUIZ_BY_CLASSROOM_ID_REQUEST, GetAllQuizzesByClassroomID),
    takeLatest(types.GET_ALL_QUIZ_BY_CREATOR_ID_REQUEST, GetAllQuizByCreatorID),
    takeLatest(types.CREATE_QUIZ_REQUEST, CreateQuiz),
    takeLatest(types.UPDATE_QUIZ_REQUEST, UpdateQuiz)
]

export default QuizSaga