import { Grade } from "./interface";

export type GradeState = typeof initialState;

export const initialState = {
    grade: {} as Grade,
}

export const GET_GRADE          = "GET_GRADE";
export const GET_GRADE_REQUEST  = "GET_GRADE_REQUEST";
export const GET_GRADE_SUCCESS  = "GET_GRADE_SUCCESS";
export const GET_GRADE_FAILED   = "GET_GRADE_FAILED";

export type GetGradeAction = {
    type: typeof GET_GRADE_REQUEST
    payload: GetGradePayload
}

export interface GetGradePayload {
    studentId:      number;
    classroomId:    number;
}