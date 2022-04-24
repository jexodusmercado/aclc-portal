import * as types from './types';

export const getAllCoursesRequest = (): types.GetCoursesAction => {
    return {
        type: types.GET_COURSES_REQUEST,
    }
}

export const createCourseRequest = (payload: types.CreateCoursePayload) : types.CreateCourseAction => {
    return {
        type: types.CREATE_COURSE_REQUEST,
        payload
    }
}