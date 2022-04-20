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
            }
        }
    
    case types.GET_COURSES_SUCCESS:
        console.log(action)
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

    default:
        return state
  }
};

export default courseRequest;
