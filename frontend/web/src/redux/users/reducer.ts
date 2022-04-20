import * as types from "./types";
import { AnyAction } from "redux";

const usersReducer = ( state: types.UserState = types.UserInitialState, action: AnyAction): types.UserState => {
  switch (action.type) {

    case types.CREATE_USER_REQUEST:
        return {
            ...state,
            created: {
                loading: true,
                success: false
            }
        }
    
    case types.CREATE_USER_SUCCESS:
        return {
            ...state,
            created: {
                loading: false,
                success: true,
            }
        }

    case types.CREATE_USER_FAILED:
        return {
            ...state,
            created: {
                loading: false,
                success: false
            }
        }

    case types.GET_USERS_REQUEST:
    case types.SEARCH_USER_REQUEST:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: true
                }
            }
        

    case types.GET_USERS_SUCCESS:
    case types.SEARCH_USER_SUCCESS:
        return {
            ...state,
            users: {
                data: action.payload,
                loading: false
            }
        }

    
    case types.GET_USERS_FAILED:
    case types.SEARCH_USER_FAILED:
        return {
            ...state,
            users: {
                ...state.users,
                loading: false
            }
        }

    case types.GET_USER_REQUEST:
        return {
            ...state,
            user: {
                ...state.user,
                loading: true
            }
        }
    
    case types.GET_USER_SUCCESS:
        return{
            ...state,
            user: {
                ...action.payload,
                loading: false
            }
        }

    case types.GET_USER_FAILED:
        return {
            ...state,
            user: {
                ...state.user,
                loading: false
            }
        }


    default:
        return state
  }
};

export default usersReducer;
