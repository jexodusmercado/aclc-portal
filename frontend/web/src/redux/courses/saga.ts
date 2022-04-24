import * as types from './types';
import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios'
import { courseRequest } from 'services/request';
import { handleAxiosError } from 'utility';
import toast from 'react-hot-toast';


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

function* CreateCourseType({payload}: types.CreateCourseAction) {
    try {

        yield call(courseRequest.createCourseRequest, payload)

        yield put({
            type: types.CREATE_COURSE_SUCCESS,
        })

        toast.success('Course added')

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_COURSE_FAILED,
            payload
        })

        toast.error('Failed to add course')

    }
}

const CourseSaga: ForkEffect[] = [
    takeLatest(types.GET_COURSES_REQUEST, GetCoursesType),
    takeLatest(types.CREATE_COURSE_REQUEST, CreateCourseType)
]

export default CourseSaga;