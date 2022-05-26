import * as types from './types';

export const getAllClassrooms = (payload: types.GetAllClassroomPayload): types.GetClassroomsAction => {
    return {
        type: types.GET_CLASSROOMS_REQUEST,
        payload
    }
}
