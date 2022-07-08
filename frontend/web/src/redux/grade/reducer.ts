import * as types from "./type";
import { AnyAction } from "redux";
import { type } from "os";

const gradeReducer = ( state: types.GradeState = types.initialState, action: AnyAction): types.GradeState => {
    switch(action.type){

        case types.GET_GRADE_SUCCESS:
            return {
                grade: action.payload
            }

        default:
             return {
                ...state
             }
    }
}

export default gradeReducer;