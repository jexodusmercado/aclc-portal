import { IPayload } from 'interfaces';
import { Classroom, Student } from './interface';

export type ClassroomState = typeof ClassroomInitialState;

export const ClassroomInitialState  = {
    classrooms: [] as Classroom[],
    classroom: {} as Classroom,
    students: [] as Student[],
    created: {
        loading: false,
        success: false
    },
    deleted: {
        loading: false
    }
}

export const CREATE_CLASSROOM                       =   "CREATE_CLASSROOM"
export const CREATE_CLASSROOM_REQUEST               =   "CREATE_CLASSROOM_REQUEST"
export const CREATE_CLASSROOM_SUCCESS               =   "CREATE_CLASSROOM_SUCCESS"
export const CREATE_CLASSROOM_FAILED                =   "CREATE_CLASSROOM_FAILED"

export const UPDATE_CLASSROOM                       =   "UPDATE_CLASSROOM"
export const UPDATE_CLASSROOM_REQUEST               =   "UPDATE_CLASSROOM_REQUEST"
export const UPDATE_CLASSROOM_SUCCESS               =   "UPDATE_CLASSROOM_SUCCESS"
export const UPDATE_CLASSROOM_FAILED                =   "UPDATE_CLASSROOM_FAILED"

export const GET_CLASSROOMS                         =   "GET_CLASSROOMS"
export const GET_CLASSROOMS_REQUEST                 =   "GET_CLASSROOMS_REQUEST"
export const GET_CLASSROOMS_SUCCESS                 =   "GET_CLASSROOMS_SUCCESS"
export const GET_CLASSROOMS_FAILED                  =   "GET_CLASSROOMS_FAILED"

export const GET_CLASSROOM                          =   "GET_CLASSROOM"
export const GET_CLASSROOM_REQUEST                  =   "GET_CLASSROOM_REQUEST"
export const GET_CLASSROOM_SUCCESS                  =   "GET_CLASSROOM_SUCCESS"
export const GET_CLASSROOM_FAILED                   =   "GET_CLASSROOM_FAILED"

export const DELETE_CLASSROOM                       =   "DELETE_CLASSROOM"
export const DELETE_CLASSROOM_REQUEST               =   "DELETE_CLASSROOM_REQUEST"
export const DELETE_CLASSROOM_SUCCESS               =   "DELETE_CLASSROOM_SUCCESS"
export const DELETE_CLASSROOM_FAILED                =   "DELETE_CLASSROOM_FAILED"

export const GET_ALL_CLASSROOM_TEACHER_ID           =   "GET_ALL_CLASSROOM_TEACHER_ID"
export const GET_ALL_CLASSROOM_TEACHER_ID_REQUEST   =   "GET_ALL_CLASSROOM_TEACHER_ID_REQUEST"
export const GET_ALL_CLASSROOM_TEACHER_ID_SUCCESS   =   "GET_ALL_CLASSROOM_TEACHER_ID_SUCCESS"
export const GET_ALL_CLASSROOM_TEACHER_ID_FAILED    =   "GET_ALL_CLASSROOM_TEACHER_ID_FAILED"

export const GET_ALL_CLASSROOM_STUDENT_ID           =   "GET_ALL_CLASSROOM_STUDENT_ID"
export const GET_ALL_CLASSROOM_STUDENT_ID_REQUEST   =   "GET_ALL_CLASSROOM_STUDENT_ID_REQUEST"
export const GET_ALL_CLASSROOM_STUDENT_ID_SUCCESS   =   "GET_ALL_CLASSROOM_STUDENT_ID_SUCCESS"
export const GET_ALL_CLASSROOM_STUDENT_ID_FAILED    =   "GET_ALL_CLASSROOM_STUDENT_ID_FAILED"

export const GET_ALL_STUDENTS_BY_TEACHER_ID         =   "GET_ALL_STUDENTS_BY_TEACHER_ID"
export const GET_ALL_STUDENTS_BY_TEACHER_ID_REQUEST =   "GET_ALL_STUDENTS_BY_TEACHER_ID_REQUEST"
export const GET_ALL_STUDENTS_BY_TEACHER_ID_SUCCESS =   "GET_ALL_STUDENTS_BY_TEACHER_ID_SUCCESS"
export const GET_ALL_STUDENTS_BY_TEACHER_ID_FAILED  =   "GET_ALL_STUDENTS_BY_TEACHER_ID_FAILED"


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

export type GetByStudentIDAction = {
    type: typeof GET_ALL_CLASSROOM_STUDENT_ID_REQUEST
    payload: GetByStudentIDPayload
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
export interface GetByStudentIDPayload {
    studentId: string
    keyword?: string
}