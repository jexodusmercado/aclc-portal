import { AxiosResponse, AxiosError } from "axios";
import { put, call, ForkEffect, takeLatest} from "redux-saga/effects";
import { subjectRequest } from "services/request";
import { handleAxiosError } from "utility";
import * as types from "./types"

function* GetSubjects ({payload} : types.GetSubjectsAction) {
    try {
        
        const response: AxiosResponse = yield call(subjectRequest.getSubjects, payload);

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

const SubjectSaga: ForkEffect[] = [
    takeLatest(types.GET_SUBJECT_REQUEST, GetSubjects)
]

export default SubjectSaga;