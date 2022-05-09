/**
 * TYPED STATES
 */
export type SchoolYearState          = typeof SchoolYearInitial
export type GetAllSchoolYearState    = typeof SchoolYearInitial["schoolYears"]
export type ActiveSchoolYearState    = typeof SchoolYearInitial["activeSchoolyear"]["data"]


/**
 * STATES
 */
export const SchoolYearInitial  = {
   schoolYears: {
        data: [
            {
                ID: 0,
                created_at: "",
                is_active: false,
                school_year: "",
                semester: "",
                updated_at: ""
            }
        ],
        loading: false
    },
    activeSchoolyear: {
        data: {
            ID: 0,
            created_at: "",
            is_active: false,
            school_year: "",
            semester: "",
            updated_at: ""
        },
        loading: false
    },
    created: {
        loading: false
    },
    changing: {
        loading: false
    },
    error: {
        status: 0,
        message: ""
    }
}

/**
 * CONSTANTS
 */

export const GET_SCHOOL_YEARS_REQUEST           = "GET_SCHOOL_YEARS_REQUEST"
export const GET_SCHOOL_YEARS_SUCCESS           = "GET_SCHOOL_YEARS_SUCCESS"
export const GET_SCHOOL_YEARS_FAILED            = "GET_SCHOOL_YEARS_FAILED"

export const CREATE_SCHOOL_YEAR_REQUEST         = "CREATE_SCHOOL_YEAR_REQUEST"
export const CREATE_SCHOOL_YEAR_SUCCESS         = "CREATE_SCHOOL_YEAR_SUCCESS"
export const CREATE_SCHOOL_YEAR_FAILED          = "CREATE_SCHOOL_YEAR_FAILED"

export const GET_ACTIVE_SCHOOL_YEAR_REQUEST     = "GET_ACTIVE_SCHOOL_YEAR_REQUEST"
export const GET_ACTIVE_SCHOOL_YEAR_SUCCESS     = "GET_ACTIVE_SCHOOL_YEAR_SUCCESS"
export const GET_ACTIVE_SCHOOL_YEAR_FAILED      = "GET_ACTIVE_SCHOOL_YEAR_FAILED"

export const CHANGE_SCHOOL_YEAR_REQUEST         = "CHANGE_SCHOOL_YEAR_REQUEST"
export const CHANGE_SCHOOL_YEAR_SUCCESS         = "CHANGE_SCHOOL_YEAR_SUCCESS"
export const CHANGE_SCHOOL_YEAR_FAILED          = "CHANGE_SCHOOL_YEAR_FAILED"

/**
 * ACTIONS
 */

export type GetSchoolYearsAction = {
    type: typeof GET_SCHOOL_YEARS_REQUEST
}

export type CreateSchoolYearAction = {
    type: typeof CREATE_SCHOOL_YEAR_REQUEST
    payload: CreateSchoolYearPayload
}

export type GetActiveSchoolYearAction = {
    type: typeof GET_ACTIVE_SCHOOL_YEAR_REQUEST
}

export type ChangeActiveSchoolYearAction = {
    type: typeof CHANGE_SCHOOL_YEAR_REQUEST
    payload: ChangeActiveSchoolYearPayload
}

/**
 * INTERFACES
 */

export interface CreateSchoolYearPayload {
    school_year : string
    semester    : string
}

export interface ChangeActiveSchoolYearPayload {
    id: number
}


