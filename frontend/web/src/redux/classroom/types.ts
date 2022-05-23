import { GetUserState, GetAllUsersState, UserInitialState } from '../users/types'

interface User extends GetUserState { }

const Users = UserInitialState.users.data

const User = UserInitialState.user

export const ClassroomState  = {
    classrooms: {
        data: [
            {
                body: "",
                created_at: "",
                id: 2,
                posts: [],
                student : Users,
                subject: {
                  ID: 1,
                  CreatedAt: "",
                  UpdatedAt: "",
                  DeletedAt: null,
                  UserID: 0,
                  name: "",
                  code: "",
                  unit: 4,
                  is_active: false,
                  Classrooms: null
                },
                subject_id: 1,
                teacher: User,
                teacher_id: 2,
                title: "",
                updated_at: ""
              }
        ],
        loading: false
    },
    created: {
        loading: false,
        success: false
    }
}

export const CREATE_CLASSROOM_REQUEST   =   "CREATE_CLASSROOM_REQUEST"
export const CREATE_CLASSROOM_SUCCESS   =   "CREATE_CLASSROOM_SUCCESS"
export const CREATE_CLASSROOM_FAILED    =   "CREATE_CLASSROOM_FAILED"

export const GET_CLASSROOMS_REQUEST     =   "GET_CLASSROOMS_REQUEST"
export const GET_CLASSROOMS_SUCCESS     =   "GET_CLASSROOMS_SUCCESS"
export const GET_CLASSROOMS_FAILED      =   "GET_CLASSROOMS_FAILED"

export const GET_CLASSROOM_REQUEST      =   "GET_CLASSROOM_REQUEST"
export const GET_CLASSROOM_SUCCESS      =   "GET_CLASSROOM_SUCCESS"
export const GET_CLASSROOM_FAILED       =   "GET_CLASSROOM_FAILED"


export type CreateCourseAction = {
    type: typeof CREATE_CLASSROOM_REQUEST
}

export type GetClassroomAction = {
    type: typeof GET_CLASSROOM_REQUEST
}

export type GetClassroomsAction = {
    type: typeof GET_CLASSROOMS_REQUEST
}
