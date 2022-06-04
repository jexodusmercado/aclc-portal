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

export const updateClassroom = (payload : types.UpdateClassroomPayload): types.UpdateClassroomAction => {
    return {
        type: types.UPDATE_CLASSROOM_REQUEST,
        payload
    }
}

export const createClassroom = (payload: types.CreateClassroomPayload): types.CreateClassroomAction => {
    return {
        type: types.CREATE_CLASSROOM_REQUEST,
        payload
    }
}