import * as types from './types';
import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios'
import { schoolYearRequest } from 'services/request';
import { handleAxiosError } from 'utility';
import toast from 'react-hot-toast'


function* GetSchoolYearsType () {
    try {
        
        const response: AxiosResponse = yield call(schoolYearRequest.getAllSchoolYear);

        yield put({
            type: types.GET_SCHOOL_YEARS_SUCCESS,
            payload: response.data.data
        })

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_SCHOOL_YEARS_FAILED,
            payload
        })

    }
}

function* CreateSchoolYearType ({payload} : types.CreateSchoolYearAction) {
    try {

        yield call(schoolYearRequest.createSchoolYearRequest, payload)

        yield put({
            type: types.CREATE_SCHOOL_YEAR_SUCCESS,
        })

        toast.success('Successfully created school year')
        
    } catch (error) {

        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_SCHOOL_YEAR_FAILED,
            payload
        })

        toast.error('Failed to create school year')

    }
}


const SchoolYearSaga: ForkEffect[] = [
    takeLatest(types.GET_SCHOOL_YEARS_REQUEST, GetSchoolYearsType),
    takeLatest(types.CREATE_SCHOOL_YEAR_REQUEST, CreateSchoolYearType)
]

export default SchoolYearSaga;