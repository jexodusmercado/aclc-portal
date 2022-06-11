import { AxiosError, AxiosResponse } from "axios";
import { call, ForkEffect, put, takeLatest } from "redux-saga/effects";
import { commentRequest } from "services/request";
import { handleAxiosError } from "utility";
import * as types from "./types";

function* CreateComment({payload}: types.CreateCommentAction){
    try {

        const response: AxiosResponse = yield call(commentRequest.createComment, payload)

        yield put({
            type: types.CREATE_COMMENT_SUCCESS,
            payload: response.data
        })

        if(payload.onSuccess) payload.onSuccess()

    } catch (error) {
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.CREATE_COMMENT_FAILED,
            err
        })

        if(payload.onFailed) payload.onFailed()

    }
}

function* UpdateComment({payload}: types.UpdateCommentAction){
    try {

        const response: AxiosResponse = yield call(commentRequest.updateComment, payload)

        yield put({
            type: types.UPDATE_COMMENT_SUCCESS,
            payload: response.data
        })
        
        if(payload.onSuccess) payload.onSuccess()

    } catch (error) {
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.UPDATE_COMMENT_FAILED,
            err
        })

        if(payload.onFailed) payload.onFailed()

    }
}

function* GetComments({payload}: types.GetCommentAction){
    try {
        
        const response: AxiosResponse = yield call(commentRequest.getAllComment, payload)

        yield put({
            type: types.GET_COMMENT_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        const payload = handleAxiosError(error as AxiosError)

        yield put({
            type: types.GET_COMMENT_FAILED,
            payload
        })
    }
}

function* DeleteComment({payload}: types.DeleteCommentAction){
    try {
        
        yield call(commentRequest.deleteComment, payload)

        yield put({
            type: types.DELETE_COMMENT_SUCCESS
        })

        if(payload.onSuccess) payload.onSuccess()

    } catch (error) {
        const err = handleAxiosError(error as AxiosError)

        yield put({
            type: types.DELETE_COMMENT_FAILED,
            err
        })

        if(payload.onFailed) payload.onFailed()

    }
}

const CommentSaga: ForkEffect[] = [
    takeLatest(types.CREATE_COMMENT_REQUEST,    CreateComment),
    takeLatest(types.UPDATE_COMMENT_REQUEST,    UpdateComment),
    takeLatest(types.GET_COMMENT_REQUEST,       GetComments),
    takeLatest(types.DELETE_COMMENT_REQUEST,    DeleteComment)
]

export default CommentSaga;