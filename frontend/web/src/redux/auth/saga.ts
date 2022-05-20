import * as types from './types'
import * as schoolyear from 'redux/school-year/types'
import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects'
import { AxiosResponse, AxiosError } from 'axios'
import { authRequest } from 'services/request'
import { handleAxiosError } from 'utility'

function* LoginActionType({ payload }: types.LoginAction) {
    try {
        const response: AxiosResponse = yield call(authRequest.loginStudentRequest, payload)

        if(response.data.data.token){
            yield localStorage.setItem('tk', response.data.data.token)

            yield put({
                type: schoolyear.GET_ACTIVE_SCHOOL_YEAR_REQUEST
            })

            yield put({
                type: types.LOGIN_SUCCESS,
                payload: response.data.data.user
            })

        } 

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)
        yield localStorage.removeItem('tk')

        yield put({
            type: types.LOGIN_FAILED,
            payload
        })

    }
}

function* LogoutActionType() {
    try {

        yield localStorage.removeItem('tk')

        yield put({
            type: types.LOGOUT_SUCCESS
        })
        
    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)
        yield localStorage.removeItem('tk')

        yield put({
            type: types.LOGOUT_FAILED,
            payload
        })
    }
}


const AuthSaga: ForkEffect[] = [
    takeLatest(types.LOGIN_REQUEST, LoginActionType),
    takeLatest(types.LOGOUT_REQUEST, LogoutActionType)
]

export default AuthSaga