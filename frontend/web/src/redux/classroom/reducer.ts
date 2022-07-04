import * as types from "./types";
import { AnyAction } from "redux";

const classroomReducer = ( state: types.ClassroomState = types.ClassroomInitialState, action: AnyAction): types.ClassroomState => {
    switch (action.type) {

        case types.GET_ALL_CLASSROOM_TEACHER_ID_REQUEST:
        case types.GET_CLASSROOMS_REQUEST:
            return {
                ...state,
                classrooms: {
                    ...state.classrooms,
                    loading: true
                }
            }

        case types.GET_ALL_CLASSROOM_TEACHER_ID_SUCCESS:
        case types.GET_CLASSROOMS_SUCCESS:
            return {
                ...state,
                classrooms: {
                    data: action.payload.data.rows,
                    loading: false
                }
            }

        case types.GET_ALL_CLASSROOM_TEACHER_ID_FAILED:
        case types.GET_CLASSROOMS_FAILED:
            return {
                ...state,
                classrooms: {
                    ...state.classrooms,
                    loading: false
                }
            }

        case types.GET_CLASSROOM_REQUEST:
            return {
                ...state,
                classroom: {
                    ...state.classroom,
                    loading: true
                }
            }
        
        case types.GET_CLASSROOM_SUCCESS:
            return {
                ...state,
                classroom: {
                    data: action.payload.data,
                    loading: false
                }
            }
        
        case types.GET_CLASSROOM_FAILED:
            return {
                ...state,
                classroom: {
                    ...state.classroom,
                    loading: false
                }
            }

        case types.UPDATE_CLASSROOM_REQUEST:
            return{
                ...state,
                classroom: {
                    ...state.classroom,
                    loading: true
                }
            }
        
        case types.UPDATE_CLASSROOM_SUCCESS:
        case types.UPDATE_CLASSROOM_FAILED:
            return{
                ...state,
                classroom: {
                    ...state.classroom,
                    loading: false
                }
            }
        
        case types.DELETE_CLASSROOM_REQUEST:
            return{
                ...state,
                deleted: {
                    loading: true
                }
            }

        case types.DELETE_CLASSROOM_SUCCESS:
        case types.DELETE_CLASSROOM_FAILED:
            return {
                ...state,
                deleted: {
                    loading: false
                }
            }

        case types.GET_ALL_STUDENTS_BY_TEACHER_ID_SUCCESS:
            return {
                ...state,
                students: action.payload
            }
        
        default: 
            return state
    }
}

export default classroomReducer;