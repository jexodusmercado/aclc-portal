import * as types from './types';

export const getAllByClassroomID = ( payload: types.IDPayload ): types.getAllQuizzesByClassroomIDAction => {
    return {
        type: types.GET_ALL_QUIZ_BY_CLASSROOM_ID_REQUEST,
        payload
    }
}

export const getAllByCreatorID = ( payload: types.IDPayload ): types.getAllQuizByCreatorIDAction => {
    return {
        type: types.GET_ALL_QUIZ_BY_CREATOR_ID_REQUEST,
        payload
    }
}

export const createQuiz = ( payload: types.createQuizPayload): types.createQuizAction => {
    return {
        type: types.CREATE_QUIZ_REQUEST,
        payload
    }
}

export const updateQuiz = ( payload: types.updateQuizPayload): types.updateQuizAction => {
    return {
        type: types.UPDATE_QUIZ_REQUEST,
        payload
    }
}