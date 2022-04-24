import * as types from "./types";
import { AnyAction } from "redux";

const courseRequest = ( state: types.CourseState = types.CoursesInitialState, action: AnyAction): types.CourseState => {
  switch (action.type) {

    case types.GET_COURSES_REQUEST:
        return {
            ...state,
            courses: {
                ...state.courses,
                loading: true
            },
            created: types.CoursesInitialState.created,
            error: types.CoursesInitialState.error
        }
    
    case types.GET_COURSES_SUCCESS:
        return {
            ...state,
            courses: {
                data: action.payload,
                loading: false
            }
        }

    case types.GET_COURSES_FAILED:
        return {
            ...state,
            courses: {
                ...state.courses,
                loading: false
            }
        }

    case types.CREATE_COURSE_REQUEST:
        return {
            ...state,
            created: {
                success: false,
                loading: true
            },
            error: types.CoursesInitialState.error
        }

    case types.CREATE_COURSE_SUCCESS:
        return {
            ...state,
            created: {
                success: true,
                loading: false
            }
        }

    case types.CREATE_COURSE_FAILED:
        return {
            ...state,
            created: {
                success: false,
                loading: false
            },
            error: action.payload
        }

    default:
        return state
  }
}

export default courseRequest;
