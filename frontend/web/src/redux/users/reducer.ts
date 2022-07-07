import * as types from "./types";
import { AnyAction } from "redux";

const usersReducer = ( state: types.UserState = types.UserInitialState, action: AnyAction): types.UserState => {
  switch (action.type) {

    case types.GET_USERS_SUCCESS:
    case types.SEARCH_USER_SUCCESS:
        return {
            ...state,
            users: action.payload
        }
    
    case types.GET_USER_SUCCESS:
        return{
            ...state,
            user: action.payload
        }

    default:
        return state
  }
};

export default usersReducer;
