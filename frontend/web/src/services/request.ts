import axios from "axios";
import { END_POINTS } from "services/api";
import { apiInstance } from "services/axios";
import { LoginPayload } from "redux/auth/types";
import { CreateUserPayload, DeleteUsersPayload, GetUserPayload, GetUsersPayload, UpdateUserPayload } from "redux/users/types";
import { CreateCoursePayload } from "redux/courses/types";
import { ChangeActiveSchoolYearPayload, CreateSchoolYearPayload } from "redux/school-year/types";
import { CreateClassroomPayload, GetAllClassroomPayload, GetByTeacherIDPayload, GetClassroomPayload, UpdateClassroomPayload } from "redux/classroom/types";
import { CreateSubjectsPayload, DeleteSubjectPayload, GetAllSubjectPayload, GetSubjectPayload, UpdateSubjectPayload } from "redux/subject/types";
import { CreatePostPayload, DeletePostPayload } from "redux/post/types";
import { CreateUpdatePayload, GetDeletePayload } from "redux/comment/types";
import { createQuizPayload, IDPayload, updateQuizPayload } from "redux/quiz/types";


export const authRequest = {
    
    loginStudentRequest: (params: LoginPayload) => 
        apiInstance.post(`${END_POINTS.AUTH}/${END_POINTS.LOGIN}`, params),

}

export const usersRequest = {
    createUserRequest: (params: CreateUserPayload) =>
        apiInstance.post(`${END_POINTS.AUTH}/${params.letter_type}/${END_POINTS.REGISTER}`, params.formData),

    getAllUsersRequest: (params?: GetUsersPayload) =>
        apiInstance.get(END_POINTS.USER, { params }),

    getUserRequest: (params: GetUserPayload) =>
        apiInstance.get(`${END_POINTS.USER}/${params.id}`),

    updateUserRequest: (params: UpdateUserPayload) =>
        apiInstance.patch(`${END_POINTS.USER}/${params.id}`, params.formData),

    deleteUserRequest: (params : DeleteUsersPayload) => {
        const request = params.ids.map((id) => {
            return apiInstance.delete(`${END_POINTS.USER}/${id}`)
        })

        return axios.all(request)
    }
}

export const courseRequest = {
    getAllCoursesRequest: () =>
        apiInstance.get(END_POINTS.COURSE),
    createCourseRequest: (params: CreateCoursePayload) =>
        apiInstance.post(END_POINTS.COURSE, params)
}

export const schoolYearRequest = {
    getAllSchoolYear: () =>
        apiInstance.get(END_POINTS.SCHOOL_YEAR),
    createSchoolYearRequest: (params: CreateSchoolYearPayload) =>
        apiInstance.post(END_POINTS.SCHOOL_YEAR, params),
    GetActiveSchoolYear: () =>
        apiInstance.get(`${END_POINTS.SCHOOL_YEAR}/${END_POINTS.ACTIVE}`),
    ChangeActiveSchoolYear: (params: ChangeActiveSchoolYearPayload) =>
        apiInstance.get(`${END_POINTS.SCHOOL_YEAR}/${END_POINTS.CHANGE_ACTIVE}/${params.id}`)
}

export const classroomRequest = {
    createClassroom: (params: CreateClassroomPayload) =>
        apiInstance.post(`${END_POINTS.CLASSROOM}/${END_POINTS.CREATE}`, params),
    getClassroom: (params: GetClassroomPayload) => 
        apiInstance.get(`${END_POINTS.CLASSROOM}/${params.classroomId}`),
    getAllClassrooms: (params: GetAllClassroomPayload) =>
        apiInstance.get(END_POINTS.CLASSROOM, {params}),
    getByTeacherID: (params: GetByTeacherIDPayload) =>
        apiInstance.get(`${END_POINTS.CLASSROOM}/${END_POINTS.TEACHER}/${params.teacherId}`, { params }),
    updateClassroom: (params: UpdateClassroomPayload) =>
        apiInstance.patch(`${END_POINTS.CLASSROOM}/${params.classroomId}`, params),
    deleteClassroom : (params: GetClassroomPayload) =>
        apiInstance.delete(`${END_POINTS.CLASSROOM}/${params.classroomId}`)
    
}

export const subjectRequest = {
    getAllSubject: (params: GetAllSubjectPayload) =>
        apiInstance.get(END_POINTS.SUBJECT, { params }),

    getSubject: (param: GetSubjectPayload) =>
        apiInstance.get(`${END_POINTS.SUBJECT}/${param.id}`),

    createSubject: (params: CreateSubjectsPayload) =>
        apiInstance.post(END_POINTS.SUBJECT, params),

    updateSubject: (params: UpdateSubjectPayload) =>{
        const {id, ...rest} = params
        return apiInstance.patch(`${END_POINTS.SUBJECT}/${id}`, rest)
    },
    
    deleteSubject: (params: DeleteSubjectPayload) =>
        apiInstance.delete(`${END_POINTS.SUBJECT}/${params.id}`)
}

export const postRequest = {
    createPost: (params: CreatePostPayload) =>
        apiInstance.post(
            `${END_POINTS.CLASSROOM}/${params.classroomId}/${END_POINTS.POST}/${END_POINTS.CREATE}`, 
            params.formdata, 
            { 
                headers : {
                    'content-type': 'multipart/form-data'
                }
            }
        ),
    deletePost: (params: DeletePostPayload) =>
        apiInstance.delete(`${END_POINTS.CLASSROOM}/${params.classroomId}/${END_POINTS.POST}/${params.postId}`)
}

export const commentRequest = {
    createComment: (params: CreateUpdatePayload) =>
        apiInstance.post(`${END_POINTS.COMMENT}/${params.postId}`, params),
    getAllComment: (params: GetDeletePayload) =>
        apiInstance.get(`${END_POINTS.COMMENT}/${params.postId}`),
    updateComment: (params: CreateUpdatePayload) =>
        apiInstance.patch(`${END_POINTS.COMMENT}/${params.commentId}`, params),
    deleteComment: (params: GetDeletePayload) =>
        apiInstance.delete(`${END_POINTS.COMMENT}/${params.commentId}`)
}

export const publicRequest = {
    getDownloadRequest: (filename: string) =>
        apiInstance.get(`${END_POINTS.DOWNLOAD}/${filename}`)

}

export const quizRequest = {
    getAllByCreatorID: (payload: IDPayload) =>
        apiInstance.get(`${END_POINTS.QUIZ}/${END_POINTS.CREATOR}/${payload.id}`),
    getAllByClassroomID: (payload: IDPayload) =>
        apiInstance.get(`${END_POINTS.QUIZ}/${END_POINTS.CLASSROOM}/${payload.id}`),
    getByID: (payload: IDPayload) =>
        apiInstance.get(`${END_POINTS.QUIZ}/${payload.id}`),
    createQuiz: (payload: createQuizPayload) => 
        apiInstance.post(END_POINTS.QUIZ, payload),
        
    updateQuiz: (payload: updateQuizPayload) => {
        const {id, ...data} = payload
        return apiInstance.patch(`${END_POINTS.QUIZ}/${id}`, data)
    }
}

export const quizContentRequest = {
    createContent: (form: any[], quizId: string) => {
        const request = form.map(value => {
            return apiInstance.post(`${END_POINTS.QUIZ}/${quizId}`, value)
        })

        return axios.all(request)
    }
}