import * as types from "./types";
import { AnyAction } from "redux";

const schoolYearReducer = ( state: types.SchoolYearState = types.SchoolYearInitial, action: AnyAction): types.SchoolYearState => {
  switch (action.type) {

    case types.CREATE_SCHOOL_YEAR_REQUEST:
        return {
            ...state,
            created: {
                loading: false
            },
            error: types.SchoolYearInitial.error
        }

    case types.CREATE_SCHOOL_YEAR_SUCCESS:
        return {
            ...state,
            created: {
                loading: false
            }
        }

    case types.CREATE_SCHOOL_YEAR_FAILED:
        return {
            ...state,
            created: {
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

    case types.GET_ACTIVE_SCHOOL_YEAR_REQUEST:
        return{
            ...state,
            activeSchoolyear: {
                ...state.activeSchoolyear,
                loading: true
            },
            created: types.SchoolYearInitial.created,
            error: types.SchoolYearInitial.error
        }

    case types.GET_ACTIVE_SCHOOL_YEAR_SUCCESS:
        return {
            ...state,
            activeSchoolyear: {
                data: action.payload,
                loading: false
            }
        }

    case types.GET_ACTIVE_SCHOOL_YEAR_FAILED:
        return {
            ...state,
            activeSchoolyear: {
                ...state.activeSchoolyear,
                loading: false
            }
        }

    default:
        return {
            ...state
        }
  }
};

export default schoolYearReducer;
