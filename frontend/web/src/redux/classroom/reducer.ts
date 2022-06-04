import * as types from "./types";
import { AnyAction } from "redux";

const classroomReducer = ( state: types.ClassroomState = types.ClassroomInitialState, action: AnyAction): types.ClassroomState => {
    switch (action.type) {

        case types.GET_CLASSROOMS_REQUEST:
            return {
                ...state,
                classrooms: {
                    ...state.classrooms,
                    loading: true
                }
            }

        case types.GET_CLASSROOMS_SUCCESS:
            return {
                ...state,
                classrooms: {
                    data: action.payload.data.rows,
                    loading: false
                }
            }

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

        default: 
            return state
    }
}

export default classroomReducer;