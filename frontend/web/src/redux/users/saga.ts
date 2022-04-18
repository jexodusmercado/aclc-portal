import * as types from './types';
import { call, put, takeLatest, ForkEffect, delay } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios'
import { usersRequest } from 'services/request';
import { handleAxiosError } from 'utility';
import toast from 'react-hot-toast'


function* CreateUserType ({ payload } : types.CreateUserAction) {
    try {
        
        yield call(usersRequest.createUserRequest, payload);

        yield put({
            type: types.CREATE_USER_SUCCESS
        })   

        toast.success('Faculty member created')

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_USER_FAILED,
            payload
        })

        toast.error('Unable to create faculty member.')
    }
}

function* GetAllUsersType ({payload} : types.GetUsersAction) {
    try {
        const response : AxiosResponse = yield call(usersRequest.getAllUsersRequest, payload)

        yield put({
            type: types.GET_USERS_SUCCESS,
            payload: response.data.data.rows
        })

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_USERS_FAILED,
            payload
        })

        toast.error('Failed getting data from server.')
    }
}

function* SearchUserType ({payload} : types.GetUsersAction) {
    try {

        yield delay(500)
        
        const response : AxiosResponse = yield call(usersRequest.getAllUsersRequest, payload)

        yield put({
            type: types.SEARCH_USER_SUCCESS,
            payload: response.data.data.rows
        })

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.SEARCH_USER_FAILED,
            payload
        })

        toast.error('Failed getting data from server.')
    }
}

function* GetUserType({payload}: types.GetUserAction) {
    try {
        const response : AxiosResponse = yield call(usersRequest.getUserRequest, payload)

        yield put({
            type: types.GET_USER_SUCCESS,
            payload: response.data.data
        })

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.SEARCH_USER_FAILED,
            payload
        })

        toast.error('Failed getting data from server.')
        
    }
}


const UsersSaga: ForkEffect[] = [
    takeLatest(types.CREATE_USER_REQUEST, CreateUserType),
    takeLatest(types.GET_USERS_REQUEST, GetAllUsersType),
    takeLatest(types.SEARCH_USER_REQUEST, SearchUserType),
    takeLatest(types.GET_USER_REQUEST, GetUserType)
]

export default UsersSaga;