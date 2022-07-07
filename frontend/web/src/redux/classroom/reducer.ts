import * as types from "./types";
import { AnyAction } from "redux";

const classroomReducer = ( state: types.ClassroomState = types.ClassroomInitialState, action: AnyAction): types.ClassroomState => {
    switch (action.type) {

        case types.GET_ALL_CLASSROOM_TEACHER_ID_SUCCESS:
        case types.GET_CLASSROOMS_SUCCESS:
            return {
                ...state,
                classrooms: action.payload.data.rows
            }
        
        case types.GET_CLASSROOM_SUCCESS:
            return {
                ...state,
                classroom: action.payload.data
            }

        case types.GET_ALL_STUDENTS_BY_TEACHER_ID_SUCCESS:
            return {
                ...state,
                students: action.payload
            }

        case types.GET_ALL_CLASSROOM_STUDENT_ID_SUCCESS:
            return {
                ...state,
                classrooms: action.payload.data.rows
            }
        
        default: 
            return state
    }
}

export default classroomReducer;