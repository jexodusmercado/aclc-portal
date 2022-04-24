import * as types from './types';

export const GetAllSchoolYears = (): types.GetSchoolYearsAction => {
    return{
        type: types.GET_SCHOOL_YEARS_REQUEST
    }
}

export const CreateSchoolyear = (payload: types.CreateSchoolYearPayload) : types.CreateSchoolYearAction => {
    return {
        type: types.CREATE_SCHOOL_YEAR_REQUEST,
        payload
    }
}