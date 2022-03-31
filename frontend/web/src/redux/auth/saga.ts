import * as types from './types';
import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios'
import { authRequest } from 'services/request';
import { handleAxiosError } from 'utility';

function* LoginActionType({ payload }: types.LoginAction) {
    try {
        const response: AxiosResponse = yield call(authRequest.loginStudentRequest, payload);

        console.log(response)

        if(response.data.data.token){
            localStorage.setItem('tk', response.data.data.token)

            yield put({
                type: types.LOGIN_SUCCESS,
                payload: response.data.data.user
            })   
        } 

    } catch (err) {
        const payload = handleAxiosError(err as AxiosError)

        yield put({
            type: types.LOGIN_FAILED,
            payload
        })

    }
}


const AuthSaga: ForkEffect[] = [
    takeLatest(types.LOGIN_REQUEST, LoginActionType)
]

export default AuthSaga;