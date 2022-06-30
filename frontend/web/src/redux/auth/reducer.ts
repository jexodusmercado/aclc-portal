import * as types from "./types";
import { AnyAction } from "redux";

const authReducer = ( state: types.AuthState = types.initialState, action: AnyAction): types.AuthState => {
  switch (action.type) {

    case types.LOGIN_REQUEST:
        return {
            ...state,
            user: {} as types.AuthUser,
            loading: true
        }

    case types.LOGIN_SUCCESS:
        return {
            ...state,
            user: action.payload,
            authenticated: true,          
            loading: false
        }

    case types.LOGIN_FAILED:
        return {
            ...state,
            user: {} as types.AuthUser,
            authenticated: false,
            loading: false,
            error: {
                status: action.payload.status,
                message: action.payload.message
            }
        }

    case types.LOGOUT_REQUEST:
        return {
            ...state,
            user: {} as types.AuthUser,
            loading: true,
            error: {} as types.Error
        }

    case types.LOGOUT_FAILED:
        return {
            ...state,
            user: {} as types.AuthUser,
            loading: false,
            error:  {
                status: action.payload.status,
                message: action.payload.message
            }
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
