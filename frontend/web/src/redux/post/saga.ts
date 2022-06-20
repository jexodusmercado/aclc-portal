import * as types from './types';
import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios'
import { postRequest } from 'services/request';
import { handleAxiosError } from 'utility';


function* CreatePostAction ({ payload }: types.CreatePostAction) {
    try {
        
        const response : AxiosResponse = yield call(postRequest.createPost, payload);

        yield put({
            type: types.CREATE_POST_SUCCESS,
            payload: response.data
        })   
        
        if(payload.onSuccess) payload.onSuccess()

    } catch (error) {
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_POST_FAILED,
            err
        })

        if(payload.onFailed) payload.onFailed()

    }
}

function* DeletePostAction ({payload} : types.DeletePostAction) {
    try {
        const response : AxiosResponse = yield call(postRequest.deletePost, payload);

        yield put({
            type: types.CREATE_POST_SUCCESS,
            payload: response.data
        })   
        
        if(payload.onSuccess) payload.onSuccess()
    } catch (error) {
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_POST_FAILED,
            err
        })

        if(payload.onFailed) payload.onFailed()
    }
}

const PostSaga: ForkEffect[] = [
    takeLatest(types.CREATE_POST_REQUEST, CreatePostAction),
    takeLatest(types.DELETE_POST_REQUEST, DeletePostAction)
]

export default PostSaga;