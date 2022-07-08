import { AxiosError, AxiosResponse } from "axios";
import { put, call, ForkEffect, takeLatest } from "redux-saga/effects";
import { gradeRequest } from "services/request";
import { handleAxiosError } from "utility";
import { GetGradeAction, GET_GRADE_REQUEST, GET_GRADE_SUCCESS, GET_GRADE_FAILED } from "./type";


function* GetGrade({payload}: GetGradeAction) {
    try {
        const response: AxiosResponse = yield call(gradeRequest.getGradeByStudentAndClassroom, payload);


        yield put({
            type: GET_GRADE_SUCCESS,
            payload: response.data
        });
    }catch(error) {

        const err = handleAxiosError(error as AxiosError)
        
        yield put({
            type: GET_GRADE_FAILED,
            payload: err
        });
    }
}


const GradeSaga: ForkEffect[] = [
    takeLatest(GET_GRADE_REQUEST, GetGrade),
]

export default GradeSaga;

