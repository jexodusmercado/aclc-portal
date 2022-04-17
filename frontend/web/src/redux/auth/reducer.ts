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


    case types.LOGOUT_REQUEST:
        return {
            user: types.initialState.user,
        }

    case types.LOGOUT_FAILED:
        return {
            user: types.initialState.user,
        }
    case types.LOGOUT_SUCCESS:
        return {
            user: types.initialState.user,
        }
    
    default:
        return state
  }
};

export default authReducer;
