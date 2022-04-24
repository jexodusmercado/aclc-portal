import * as types from "./types";
import { AnyAction } from "redux";

const schoolYearReducer = ( state: types.SchoolYearType = types.SchoolYearInitial, action: AnyAction): types.SchoolYearType => {
  switch (action.type) {

    case types.CREATE_SCHOOL_YEAR_REQUEST:
        return {
            ...state,
            created: {
                success: false,
                loading: false
            },
            error: types.SchoolYearInitial.error
        }

    case types.CREATE_SCHOOL_YEAR_SUCCESS:
        return {
            ...state,
            created: {
                success: true,
                loading: false
            }
        }

    case types.CREATE_SCHOOL_YEAR_FAILED:
        return {
            ...state,
            created: {
                success: false,
                loading: false
            },
            error: action.payload
        }

    case types.GET_SCHOOL_YEARS_REQUEST:
        return {
            ...state,
            schoolYears: {
                ...state.schoolYears,
                loading: true
            },
            created: types.SchoolYearInitial.created,
            error: types.SchoolYearInitial.error
        }

    case types.GET_SCHOOL_YEARS_SUCCESS:
        return {
            ...state,
            schoolYears: {
                data: action.payload.rows,
                loading: false
            }
        }

    case types.GET_SCHOOL_YEARS_FAILED:
        return {
            ...state,
            schoolYears: {
                ...state.schoolYears,
                loading: false
            }
        }

    default:
        return state
  }
};

export default schoolYearReducer;
