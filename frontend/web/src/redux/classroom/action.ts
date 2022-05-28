import * as types from './types';

export const getAllClassrooms = (payload: types.GetAllClassroomPayload): types.GetClassroomsAction => {
    return {
        type: types.GET_CLASSROOMS_REQUEST,
        payload
    }
}

export const getClassroom = (payload: types.GetClassroomPayload): types.GetClassroomAction => {
    return {
        type: types.GET_CLASSROOM_REQUEST,
        payload
    }
}