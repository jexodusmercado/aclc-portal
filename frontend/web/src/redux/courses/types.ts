/**
 * TYPED STATES
 */
export type CourseState = typeof CoursesInitialState
export type GetCoursesState = typeof CoursesInitialState['courses']


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
                users: [
                    {
                        id: 0,
                        username: "",
                        email: "",
                        first_name: "",
                        last_name: "",
                        birthday: "",
                        type: "",
                        is_active: false,
                        updated_at: "",
                        created_at: "",
                    }
                ]
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
        users: {
            id: 0,
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            birthday: "",
            type: "",
            is_active: false,
            updated_at: "",
            created_at: "",
        }
    },
    created: {
        loading: false,
        success: false
    }
}

/**
 * CONSTANTS
 */

export const GET_COURSES_REQUEST  = "GET_COURSES_REQUEST"
export const GET_COURSES_SUCCESS  = "GET_COURSES_SUCCESS"
export const GET_COURSES_FAILED   = "GET_COURSES_FAILED"

/**
 * ACTIONS
 */

export type GetCoursesAction = {
    type : typeof GET_COURSES_REQUEST
}


/**
 * INTERFACES
 */

