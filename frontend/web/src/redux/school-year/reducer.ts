import * as types from "./types";
import { AnyAction } from "redux";

const schoolYearReducer = ( state: types.SchoolYearState = types.SchoolYearInitial, action: AnyAction): types.SchoolYearState => {
  switch (action.type) {

    case types.GET_SCHOOL_YEARS_SUCCESS:
        return {
            ...state,
            schoolYears: action.payload.rows
        }

    case types.GET_ACTIVE_SCHOOL_YEAR_SUCCESS:
        return {
            ...state,
            activeSchoolyear: action.payload
        }

    default:
        return {
            ...state
        }
  }
};

export default schoolYearReducer;
