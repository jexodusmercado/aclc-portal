import { UserInitialState } from '../users/types'

export type ClassroomState = typeof ClassroomInitialState;

const UsersState = UserInitialState.users.data

const UserState = UserInitialState.user

export const ClassroomInitialState  = {
    classrooms: {
        data: [
            {
                body: "",
                created_at: "",
                id: 0,
                posts: [],
                student : UsersState,
                subject: {
                  ID: 0,
                  CreatedAt: "",
                  UpdatedAt: "",
                  DeletedAt: null,
                  UserID: 0,
                  name: "",
                  code: "",
                  unit: 0,
                  is_active: false,
                  Classrooms: null
                },
                subject_id: 0,
                teacher: UserState,
                teacher_id: 0,
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

export const UPDATE_CLASSROOM_REQUEST   =   "UPDATE_CLASSROOM_REQUEST"
export const UPDATE_CLASSROOM_SUCCESS   =   "UPDATE_CLASSROOM_SUCCESS"
export const UPDATE_CLASSROOM_FAILED    =   "UPDATE_CLASSROOM_FAILED"

export const GET_CLASSROOMS_REQUEST     =   "GET_CLASSROOMS_REQUEST"
export const GET_CLASSROOMS_SUCCESS     =   "GET_CLASSROOMS_SUCCESS"
export const GET_CLASSROOMS_FAILED      =   "GET_CLASSROOMS_FAILED"

export const GET_CLASSROOM_REQUEST      =   "GET_CLASSROOM_REQUEST"
export const GET_CLASSROOM_SUCCESS      =   "GET_CLASSROOM_SUCCESS"
export const GET_CLASSROOM_FAILED       =   "GET_CLASSROOM_FAILED"


export type CreateClassroomAction = {
    type: typeof CREATE_CLASSROOM_REQUEST
    payload: CreateClassroomPayload
}

export type UpdateClassroomAction = {
    type: typeof UPDATE_CLASSROOM_REQUEST
    payload: UpdateClassroomPayload
}

export type GetClassroomAction = {
    type: typeof GET_CLASSROOM_REQUEST
    payload: GetClassroomPayload
}

export type GetClassroomsAction = {
    type: typeof GET_CLASSROOMS_REQUEST
    payload: GetAllClassroomPayload
}

export interface CreateClassroomPayload { 
    teacher_id: number
    subject_id: number
    student_id: Array<number>
    body:       string
    title:      string
}

export interface UpdateClassroomPayload extends Partial<CreateClassroomPayload> {
    classroomId: string
}

export interface GetClassroomPayload {
    classroomId: string
}

export interface GetAllClassroomPayload {
    keyword: string
}