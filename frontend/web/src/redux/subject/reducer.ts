import * as types from "./types"
import { AnyAction } from "redux"

const subjectReducer = ( state: types.SubjectState = types.SubjectInitial, action: AnyAction ) : types.SubjectState => {

    switch(action.type) {
     
        case types.GET_SUBJECT_REQUEST:
            return {
                ...state,
                subjects: {
                    ...state.subjects,
                    loading: true
                }
            }

        case types.GET_SUBJECT_SUCCESS:
            return {
                ...state,
                subjects: {
                    data: action.payload.data.rows,
                    loading: false
                }
            }
        
        case types.GET_SUBJECT_FAILED:
            return {
                ...state,
                subjects: {
                    ...state.subjects,
                    loading: false
                }
            }
        
        default:
            return state
    }

}

export default subjectReducer;