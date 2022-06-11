import * as types from "./types";
import { AnyAction } from "redux";

const commentReducer = ( state: types.CommentState = types.initialState, action: AnyAction): types.CommentState => {
    switch(action.type){

        case types.GET_COMMENT_REQUEST:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    loading: true
                }
            }

        case types.GET_COMMENT_SUCCESS:
            return {
                ...state,
                comments: {
                    data: action.payload,
                    loading: false
                }
            }
        
        case types.GET_COMMENT_FAILED:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    loading: false
                }
            }

        default:
             return {
                ...state
             }
    }
}

export default commentReducer;