import { classroomRequest } from 'services/request'
import { call, ForkEffect, put, takeLatest, delay } from 'redux-saga/effects'
import { AxiosError, AxiosResponse }    from 'axios'
import * as types           from './types'
import { handleAxiosError } from 'utility'
import toast from 'react-hot-toast'

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

function* updateClassroom({payload}: types.UpdateClassroomAction) {
    try {
        const response: AxiosResponse = yield call(classroomRequest.updateClassroom, payload)

        yield put({
            type: types.UPDATE_CLASSROOM_SUCCESS,
            payload: response.data
        })
        
        if(payload.onSuccess) payload.onSuccess()

        toast.success(`${response.data.data.title} has been updated!`)

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.UPDATE_CLASSROOM_FAILED,
            payload
        })

    }
}

function* createClassroom({payload} : types.CreateClassroomAction){
    try {
        const response: AxiosResponse = yield call(classroomRequest.createClassroom, payload)

        yield put({
            type: types.CREATE_CLASSROOM_SUCCESS,
            payload: response.data
        })

        if(payload.onSuccess) payload.onSuccess()

    } catch (error) {
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_CLASSROOM_FAILED,
            err
        })

        if(payload.onFailed) payload.onFailed()
    }
}

function* deleteClassroom({payload} : types.DeleteClassroomAction){
    try {

        const response: AxiosResponse = yield call(classroomRequest.deleteClassroom, payload)

        yield put({
            type: types.CREATE_CLASSROOM_SUCCESS,
            payload: response.data
        })

        if(payload.onSuccess) payload.onSuccess()
        
    } catch (error) {

        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_CLASSROOM_FAILED,
            err
        })

        if(payload.onFailed) payload.onFailed()
        
    }
}

function* getByTeacherId ({payload}: types.GetByTeacherIDAction) {
    try {

        if(payload.keyword) {
            yield delay(500)
        }

        const response : AxiosResponse = yield call(classroomRequest.getByTeacherID, payload)

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

function* getAllStudentsByTeacherID({payload}: types.GetAllStudentsByTeacherIDAction) {
    try {
        const response: AxiosResponse = yield call(classroomRequest.getAllStudentsByTeacherID, payload)

        console.log(response)
        yield put({
            type: types.GET_ALL_STUDENTS_BY_TEACHER_ID_SUCCESS,
            payload: response.data.data.rows
        })


    } catch (error) {
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_ALL_STUDENTS_BY_TEACHER_ID_FAILED,
            payload: err
        })
    }
}

const ClassroomSaga: ForkEffect[] = [
    takeLatest(types.GET_CLASSROOMS_REQUEST, getClassrooms),
    takeLatest(types.GET_CLASSROOM_REQUEST, getClassroom),
    takeLatest(types.UPDATE_CLASSROOM_REQUEST, updateClassroom),
    takeLatest(types.CREATE_CLASSROOM_REQUEST, createClassroom),
    takeLatest(types.DELETE_CLASSROOM_REQUEST, deleteClassroom),
    takeLatest(types.GET_ALL_CLASSROOM_TEACHER_ID_REQUEST, getByTeacherId),
    takeLatest(types.GET_ALL_STUDENTS_BY_TEACHER_ID_REQUEST, getAllStudentsByTeacherID)
]

export default ClassroomSaga;





