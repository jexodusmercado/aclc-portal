import { classroomRequest } from 'services/request'
import { call, ForkEffect, put, takeLatest, delay } from 'redux-saga/effects'
import { AxiosError, AxiosResponse }    from 'axios'
import * as types           from './types'
import { handleAxiosError } from 'utility'

function* getClassrooms ({payload}: types.GetClassroomsAction) {
    try {

        yield delay(500)

        const response : AxiosResponse = yield call(classroomRequest.getAllClassrooms, payload)

        console.log(response)

        yield put({
            type: types.GET_CLASSROOMS_SUCCESS,
            payload: response.data
        })

    } catch (error) {

        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_CLASSROOMS_FAILED,
            payload
        })
        
    }
}

function* getClassroom({payload}: types.GetClassroomAction){
    try {
        const response : AxiosResponse = yield call(classroomRequest.getClassroom, payload)

        yield put({
            type: types.GET_CLASSROOM_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_CLASSROOM_FAILED,
            payload
        })
    }
}

const ClassroomSaga: ForkEffect[] = [
    takeLatest(types.GET_CLASSROOMS_REQUEST, getClassrooms),
    takeLatest(types.GET_CLASSROOM_REQUEST, getClassroom)
]

export default ClassroomSaga;
