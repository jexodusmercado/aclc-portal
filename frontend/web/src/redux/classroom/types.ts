import { IPayload } from 'interfaces';
import { PostInitialState } from 'redux/post/types';
import { UserInitialState } from '../users/types'
import { Students } from './interface';

export type ClassroomState = typeof ClassroomInitialState;

export type ClassroomData  = typeof ClassroomInitialState.classrooms.data[0]

const UsersState = UserInitialState.users.data

const UserState = UserInitialState.user

const PostState = PostInitialState.posts.data

export const ClassroomInitialState  = {
    classrooms: {
        data: [
            {
                body: "",
                created_at: "",
                id: 0,
                posts: PostState,
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
                },
                subject_id: 0,
                teacher: UserState,
                teacher_id: 0,
                title: "",
                updated_at: "",
                totalStudents: 0
              }
        ],
        loading: false
    },
    classroom: {
        data:{
                body: "",
                created_at: "",
                id: 0,
                posts: PostState,
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
                quizzes: [
                    {
                        id: 0,
                        contentCount: 0,
                        is_published: false,
                        end_date: "",
                        created_at: "",
                        updated_at: ""
                    }
                ],
                subject_id: 0,
                teacher: UserState,
                teacher_id: 0,
                title: "",
                updated_at: ""
        },
        loading: false
    },
    students: [] as Students[],
    created: {
        loading: false,
        success: false
    },
    deleted: {
        loading: false
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

export const DELETE_CLASSROOM_REQUEST   =   "DELETE_CLASSROOM_REQUEST"
export const DELETE_CLASSROOM_SUCCESS   =   "DELETE_CLASSROOM_SUCCESS"
export const DELETE_CLASSROOM_FAILED    =   "DELETE_CLASSROOM_FAILED"

export const GET_ALL_CLASSROOM_TEACHER_ID_REQUEST   =   "GET_ALL_CLASSROOM_TEACHER_ID_REQUEST"
export const GET_ALL_CLASSROOM_TEACHER_ID_SUCCESS   =   "GET_ALL_CLASSROOM_TEACHER_ID_SUCCESS"
export const GET_ALL_CLASSROOM_TEACHER_ID_FAILED    =   "GET_ALL_CLASSROOM_TEACHER_ID_FAILED"

export const GET_ALL_STUDENTS_BY_TEACHER_ID             =   "GET_ALL_STUDENTS_BY_TEACHER_ID"
export const GET_ALL_STUDENTS_BY_TEACHER_ID_REQUEST     =   "GET_ALL_STUDENTS_BY_TEACHER_ID_REQUEST"
export const GET_ALL_STUDENTS_BY_TEACHER_ID_SUCCESS     =   "GET_ALL_STUDENTS_BY_TEACHER_ID_SUCCESS"
export const GET_ALL_STUDENTS_BY_TEACHER_ID_FAILED      =   "GET_ALL_STUDENTS_BY_TEACHER_ID_FAILED"


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

export type DeleteClassroomAction = {
    type: typeof DELETE_CLASSROOM_REQUEST
    payload: GetClassroomPayload
}

export type GetByTeacherIDAction = {
    type: typeof GET_ALL_CLASSROOM_TEACHER_ID_REQUEST
    payload: GetByTeacherIDPayload
}

export type GetAllStudentsByTeacherIDAction = {
    type: typeof GET_ALL_STUDENTS_BY_TEACHER_ID_REQUEST
    payload: GetAllStudentsByTeacherIDPayload
}

export interface GetAllStudentsByTeacherIDPayload {
    teacherId: number,
    keyword?: string,
    courseId?: string,
    classroomId?: string
}


export interface CreateClassroomPayload extends IPayload { 
    teacher_id: number
    subject_id: number
    student_id: Array<number>
    body?:      string
    title:      string
    school_year_id: number
}

export interface UpdateClassroomPayload extends Partial<CreateClassroomPayload> {
    classroomId: string
}

export interface GetClassroomPayload extends IPayload {
    classroomId: string
}

export interface GetAllClassroomPayload {
    keyword: string
}

export interface GetByTeacherIDPayload {
    teacherId: string
    keyword: string
}