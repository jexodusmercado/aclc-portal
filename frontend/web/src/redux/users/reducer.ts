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
                },
                created: types.UserInitialState.created
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
            },
            created: types.UserInitialState.created

        }
    
    case types.GET_USER_SUCCESS:
        return{
            ...state,
            user: {
                ...action.payload,
                loading: false
            },
            
        }

    case types.GET_USER_FAILED:
        return {
            ...state,
            user: {
                ...state.user,
                loading: false
            }
        }

    case types.DELETE_USER_REQUEST:
        return {
            ...state,
            deleted: {
                loading: true
            }
        }

    case types.DELETE_USER_FAILED:
    case types.DELETE_USER_SUCCESS:
        return {
            ...state,
            deleted: {
                loading: false
            }
        }
    
    case types.UPDATE_USER_REQUEST:
        return {
            ...state,
            updated: {
                loading: true
            }
        }

    case types.UPDATE_USER_SUCCESS:
    case types.UPDATE_USER_FAILED:
        return {
            ...state,
            deleted: {
                loading: false
            }
        }


    default:
        return state
  }
};

export default usersReducer;
