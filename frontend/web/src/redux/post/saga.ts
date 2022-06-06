import * as types from './types';
import { call, put, takeLatest, ForkEffect } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios'
import { courseRequest, postRequest } from 'services/request';
import { handleAxiosError } from 'utility';
import toast from 'react-hot-toast';


function* CreatePostAction ({ payload }: types.CreatePostAction) {
    try {
        
        const response : AxiosResponse = yield call(postRequest.createPost, payload);

        yield put({
            type: types.CREATE_POST_SUCCESS,
            payload: response.data
        })   
    

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_POST_FAILED,
            payload
        })
    }
}

const PostSaga: ForkEffect[] = [
    takeLatest(types.CREATE_POST_REQUEST, CreatePostAction)
]

export default PostSaga;