import * as types from "./types";
import { AnyAction } from "redux";

const postReducer = ( state: types.PostState = types.PostInitialState, action: AnyAction): types.PostState => {
  switch (action.type) {

    case types.CREATE_POST_REQUEST:
        return {
            ...state,
            created: {
                loading: true
            }
        }
    
    case types.CREATE_POST_SUCCESS:
        return {
            ...state,
            created: {
                loading: false
            }
        }

    case types.CREATE_POST_FAILED:
        return {
            ...state,
            created: {
                loading: false
            }
        }


    default:
        return state
  }
}

export default postReducer;
