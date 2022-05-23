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

export const CREATE_CLASSROOM_REQUEST   = "GET_USERS_REQUEST"
export const CREATE_CLASSROOM_SUCCESS   = "GET_USERS_SUCCESS"
export const CREATE_CLASSROOM_FAILED    = "GET_USERS_FAILED"