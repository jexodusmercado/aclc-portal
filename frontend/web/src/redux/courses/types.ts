/**
 * TYPED STATES
 */
export type CourseState     = typeof CoursesInitialState
export type GetCoursesState = typeof CoursesInitialState['courses']
export type GetCreatedState = typeof CoursesInitialState['created']
export type GetErrorState   = typeof CoursesInitialState['error']


/**
 * STATES
 */
export const CoursesInitialState = {
    courses: {
        data: [
            {
                ID: 0,
                created_at: "",
                description: "",
                is_active: false,
                name: "",
                updated_at: "",
            }
        ],
        loading: false
    },
    course: {
        ID: 0,
        created_at: "",
        description: "",
        is_active: false,
        name: "",
        updated_at: "",
    },
    created: {
        loading: false,
        success: false
    },
    error: {
        status: 0,
        message: ""
    }
}

/**
 * CONSTANTS
 */

export const GET_COURSES_REQUEST  = "GET_COURSES_REQUEST"
export const GET_COURSES_SUCCESS  = "GET_COURSES_SUCCESS"
export const GET_COURSES_FAILED   = "GET_COURSES_FAILED"

export const CREATE_COURSE_REQUEST  = "CREATE_COURSE_REQUEST"
export const CREATE_COURSE_SUCCESS  = "CREATE_COURSE_SUCCESS"
export const CREATE_COURSE_FAILED   = "CREATE_COURSE_FAILED"

/**
 * ACTIONS
 */

export type GetCoursesAction = {
    type: typeof GET_COURSES_REQUEST
}

export type CreateCourseAction = {
    type: typeof CREATE_COURSE_REQUEST
    payload: CreateCoursePayload
}

/**
 * INTERFACES
 */

export interface CreateCoursePayload {
    name        : string
    description : string
}

