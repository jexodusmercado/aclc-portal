
import { AxiosResponse, AxiosError } from "axios";
import { put, call, ForkEffect, takeLatest, delay} from "redux-saga/effects";
import { subjectRequest } from "services/request";
import { handleAxiosError } from "utility";
import * as types from "./types"

function* GetAllSubjects ({payload} : types.GetAllSubjectAction) {
    try {
        if(payload.keyword) {
            yield delay(300)
        }
        
        const response: AxiosResponse = yield call(subjectRequest.getAllSubject, payload)

        yield put({
            type: types.GET_ALL_SUBJECT_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_ALL_SUBJECT_FAILED,
            payload
        })

    }
}

function* GetSubject({payload}: types.GetSubjectAction){
    try {
        const response: AxiosResponse = yield call(subjectRequest.getSubject, payload)

        yield put({
            type: types.GET_SUBJECT_SUCCESS,
            payload: response.data
        })

    } catch (error) {

        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_SUBJECT_FAILED,
            payload
        })
        
    }
}

function* CreateSubject ({payload}: types.CreateSubjectAction) {
    try {
        yield call(subjectRequest.createSubject, payload)

        yield put({
            type: types.CREATE_SUBJECT_SUCCESS
        })

        if(payload.onSuccess) yield payload.onSuccess()

    } catch (error) {

        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_SUBJECT_FAILED,
            err
        })

        if(payload.onFailed) yield payload.onFailed()

    }
}

function* UpdateSubject ({payload}: types.UpdateSubjectAction){
    try {
        yield call(subjectRequest.updateSubject, payload)
        
        yield put({
            type: types.UPDATE_SUBJECT_SUCCESS
        })

        if(payload.onSuccess) yield payload.onSuccess()

    } catch (error) {
        
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.UPDATE_SUBJECT_FAILED,
            err
        })

        if(payload.onFailed) yield payload.onFailed()

    }
}

function* DeleteSubject({payload}: types.DeleteSubjectAction){
    try {
        yield call(subjectRequest.deleteSubject, payload)

        yield put({
            type: types.DELETE_SUBJECT_SUCCESS
        })

        if(payload.onSuccess) yield payload.onSuccess()

    } catch (error) {

        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.DELETE_SUBJECT_FAILED,
            err
        })

        if(payload.onFailed) yield payload.onFailed()
        
    }
}

const SubjectSaga: ForkEffect[] = [
    takeLatest(types.GET_ALL_SUBJECT_REQUEST, GetAllSubjects),
    takeLatest(types.GET_SUBJECT_REQUEST, GetSubject),
    takeLatest(types.CREATE_SUBJECT_REQUEST, CreateSubject),
    takeLatest(types.UPDATE_SUBJECT_REQUEST, UpdateSubject),
    takeLatest(types.DELETE_SUBJECT_REQUEST, DeleteSubject)
]

export default SubjectSaga;