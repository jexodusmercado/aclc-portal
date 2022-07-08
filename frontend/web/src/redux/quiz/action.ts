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

export const getQuizByID = ( payload: types.IDPayload ): types.getQuizByIDAction => {
    return {
        type: types.GET_QUIZ_REQUEST,
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

export const deleteQuizContent = ( payload: types.QuizIDWithContentIDPayload ): types.deleteQuizContentAction => {
    return {
        type: types.DELETE_QUIZ_CONTENT_REQUEST,
        payload
    }
}

export const getQuizContent = ( payload: types.QuizIDAndContentIDPayload ): types.getQuizContentAction => {
    return {
        type: types.GET_QUIZ_CONTENT_REQUEST,
        payload
    }
}

export const createQuizContent = ( payload: types.CreateContentPayload): types.createQuizContentAction => {
    return {
        type: types.CREATE_QUIZ_CONTENT_REQUEST,
        payload
    }
}

export const updateQuizContent = ( payload: types.updateQuizPayload): types.updateQuizContentAction => {
    return {
        type: types.UPDATE_QUIZ_CONTENT_REQUEST,
        payload
    }
}

export const deleteQuiz = ( payload: types.IDSPayload): types.deleteQuizAction => {
    return {
        type: types.DELETE_QUIZ_REQUEST,
        payload
    }
}

export const getRandomContent = ( payload: types.IDPayload): types.getRandomQuizContentByQuizID => {
    return {
        type: types.GET_RANDOM_QUIZ_CONTENT_REQUEST,
        payload
    }
}

export const answerRandomContent = ( payload: types.AnswerQuizContentPayload): types.AnswerQuizContentAction => {
    return {
        type: types.ANSWER_QUIZ_CONTENT_REQUEST,
        payload
    }
}