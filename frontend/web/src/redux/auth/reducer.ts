import * as types from "./types";
import { AnyAction } from "redux";

const authReducer = ( state: types.AuthState = types.initialState, action: AnyAction): types.AuthState => {
  switch (action.type) {

    case types.LOGIN_REQUEST:
        return {
            ...state,
            user: {
                ...state.user,
                loading: true,
                error: types.initialState.user.error
            }
        }

    case types.LOGIN_SUCCESS:
        return {
            ...state,
            user: {
                ...state.user,
                data: action.payload,
                authenticated: true,          
                loading: false,
            }
        }

    case types.LOGIN_FAILED:
        return {
            ...state,
            user: {
                ...state.user,
                authenticated: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message
                }
            }
        }

    case types.CREATE_USER_REQUEST:
        return {
            ...state,
            createUser: {
                loading: true,
                success: false
            }
        }
    
    case types.CREATE_USER_SUCCESS:
        return {
            ...state,
            createUser: {
                loading: false,
                success: true,
            }
        }

    case types.CREATE_USER_FAILED:
        return {
            ...state,
            createUser: {
                loading: false,
                success: false
            }
        }

    case types.LOGOUT_REQUEST:
        return {
            user: types.initialState.user,
            createUser: types.initialState.createUser
        }

    case types.LOGOUT_FAILED:
        return {
            user: types.initialState.user,
            createUser: types.initialState.createUser
        }
    case types.LOGOUT_SUCCESS:
        return {
            user: types.initialState.user,
            createUser: types.initialState.createUser
        }
    
    default:
        return state
  }
};

export default authReducer;
