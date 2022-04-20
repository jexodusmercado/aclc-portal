import * as types from './types';
import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios'
import { courseRequest } from 'services/request';
import { handleAxiosError } from 'utility';


function* GetCoursesType () {
    try {
        
        const response : AxiosResponse = yield call(courseRequest.getAllCoursesRequest);

        yield put({
            type: types.GET_COURSES_SUCCESS,
            payload: response.data.data.rows
        })   
    

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_COURSES_FAILED,
            payload
        })

    }
}



const CourseSaga: ForkEffect[] = [
    takeLatest(types.GET_COURSES_REQUEST, GetCoursesType),
]

export default CourseSaga;