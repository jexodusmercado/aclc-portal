import * as types from './types';
import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios'
import { authRequest } from 'services/request';
import { handleAxiosError } from 'utility';
import toast from 'react-hot-toast'

function* LoginActionType({ payload }: types.LoginAction) {
    try {
        const response: AxiosResponse = yield call(authRequest.loginStudentRequest, payload);

        if(response.data.data.token){
            yield localStorage.setItem('tk', response.data.data.token)

            yield put({
                type: types.LOGIN_SUCCESS,
                payload: response.data.data.user
            })   
        } 

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.LOGIN_FAILED,
            payload
        })

    }
}

function* CreateUserType ({ payload } : types.CreateUserAction) {
    try {
        
        yield call(authRequest.createUserRequest, payload);

        yield put({
            type: types.CREATE_USER_SUCCESS
        })   

        toast.success('Faculty Created')

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_USER_FAILED,
            payload
        })
    }
}


const AuthSaga: ForkEffect[] = [
    takeLatest(types.LOGIN_REQUEST, LoginActionType),
    takeLatest(types.CREATE_USER_REQUEST, CreateUserType)
]

export default AuthSaga;