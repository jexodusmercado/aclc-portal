import * as types from './types';

export const getAllCoursesRequest = (): types.GetCoursesAction => {
    return {
        type: types.GET_COURSES_REQUEST,
    }
}
