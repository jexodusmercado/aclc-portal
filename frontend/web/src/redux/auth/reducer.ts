import * as types from "./types";
import { AuthState, AuthUser } from "./interface";
import { AnyAction } from "redux";

const authReducer = ( state: AuthState = types.initialState, action: AnyAction): AuthState => {
  switch (action.type) {

    case types.LOGIN_REQUEST:
        return {
            ...state,
            user: {} as AuthUser,
        }

    case types.LOGIN_SUCCESS:
    case types.FETCH_USER_SUCCESS:
        return {
            ...state,
            user: action.payload,
            authenticated: true,          
        }

    case types.LOGIN_FAILED:
        return {
            ...state,
            user: {} as AuthUser,
            authenticated: false,
        }

    case types.LOGOUT_REQUEST:
        return {
            ...state,
            user: {} as AuthUser,
        }

    case types.LOGOUT_FAILED:
        return {
            ...state,
            user: {} as AuthUser,
            
        }
    case types.LOGOUT_SUCCESS:
        return {
           ...types.initialState
        }
    
    default:
        return state
  }
};

export default authReducer;
