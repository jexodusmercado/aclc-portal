import * as types from "./types"
import { AnyAction } from "redux"

const subjectReducer = ( state: types.SubjectState = types.SubjectInitial, action: AnyAction ) : types.SubjectState => {

    switch(action.type) {
     
        case types.GET_ALL_SUBJECT_REQUEST:
            return {
                ...state,
                subjects: {
                    ...state.subjects,
                    loading: true
                }
            }

        case types.GET_ALL_SUBJECT_SUCCESS:
            return {
                ...state,
                subjects: {
                    data: action.payload.data.rows,
                    loading: false
                }
            }
        
        case types.GET_ALL_SUBJECT_FAILED:
            return {
                ...state,
                subjects: {
                    ...state.subjects,
                    loading: false
                }
            }

        case types.GET_SUBJECT_REQUEST:
            return {
                ...state,
                subject: {
                    ...types.SubjectInitial.subject,
                    loading: true
                }
            }

        case types.GET_SUBJECT_SUCCESS:
            return {
                ...state,
                subject: {
                    data: action.payload.data,
                    loading: false
                }
            }

        case types.GET_SUBJECT_FAILED:
            return {
                ...state,
                subject: {
                    ...state.subject,
                    loading: false
                }
            }

        case types.CREATE_SUBJECT_REQUEST:
            return {
                ...state,
                created: {
                    loading: true
                }
            }

        case types.CREATE_SUBJECT_SUCCESS:
        case types.CREATE_SUBJECT_FAILED:
            return {
                ...state,
                created: {
                    loading: false
                }
            }

        case types.UPDATE_SUBJECT_REQUEST:
            return {
                ...state,
                updated:{
                    loading: true
                }
            }
        
        case types.UPDATE_SUBJECT_SUCCESS:
        case types.UPDATE_SUBJECT_FAILED:
            return {
                ...state,
                updated: {
                    loading: false
                }
            }
        
        case types.DELETE_SUBJECT_REQUEST:
            return {
                ...state,
                deleted: {
                    loading: true
                }
            }

        case types.DELETE_SUBJECT_SUCCESS:
        case types.DELETE_SUBJECT_FAILED:
            return {
                ...state,
                deleted: {
                    loading: false
                }
            }
        
        default:
            return state
    }

}

export default subjectReducer;