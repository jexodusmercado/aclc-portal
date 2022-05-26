import { classroomRequest } from 'services/request'
import { call, ForkEffect, put, takeLatest, delay } from 'redux-saga/effects'
import { AxiosError, AxiosResponse }    from 'axios'
import * as types           from './types'
import { handleAxiosError } from 'utility'

function* GetClassrooms ({payload}: types.GetClassroomsAction) {
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

const ClassroomSaga: ForkEffect[] = [
    takeLatest(types.GET_CLASSROOMS_REQUEST, GetClassrooms),
]

export default ClassroomSaga;
