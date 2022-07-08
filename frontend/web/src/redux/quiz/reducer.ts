import * as types from "./types";
import { AnyAction } from "redux";

const quizReducer = ( state: types.quizInitialType = types.quizInitialState, action: AnyAction): types.quizInitialType => {
  switch (action.type) {

    case types.GET_ALL_QUIZ_BY_CLASSROOM_ID_SUCCESS:
        return {
            ...state,
            quizzes: action.payload
        }

    case types.GET_ALL_QUIZ_BY_CREATOR_ID_SUCCESS:
        return {
            ...state,
            quizzes: action.payload
        }

    case types.GET_QUIZ_SUCCESS:
        return {
            ...state,
            quiz: action.payload
        }
    
    case types.GET_QUIZ_CONTENT_SUCCESS:
        return {
            ...state,
            content: action.payload
        }

    case types.GET_RANDOM_QUIZ_CONTENT_SUCCESS:
        return {
            ...state,
            content: action.payload
        }

    default:
        return state
  }
};

export default quizReducer;
