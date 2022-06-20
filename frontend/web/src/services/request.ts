import { END_POINTS } from "services/api";
import { apiInstance } from "services/axios";
import { LoginPayload } from "redux/auth/types";
import { CreateUserPayload, GetUserPayload, GetUsersPayload } from "redux/users/types";
import { CreateCoursePayload } from "redux/courses/types";
import { ChangeActiveSchoolYearPayload, CreateSchoolYearPayload } from "redux/school-year/types";
import { CreateClassroomPayload, DeleteClassroomAction, GetAllClassroomPayload, GetByTeacherIDAction, GetByTeacherIDPayload, GetClassroomPayload, UpdateClassroomPayload } from "redux/classroom/types";
import { CreateSubjectsPayload, DeleteSubjectPayload, GetAllSubjectPayload, GetSubjectPayload, UpdateSubjectPayload } from "redux/subject/types";
import { CreatePostPayload, DeletePostPayload } from "redux/post/types";
import { CreateUpdatePayload, GetDeletePayload } from "redux/comment/types";


export const authRequest = {
    
    loginStudentRequest: (params: LoginPayload) => 
        apiInstance.post(`${END_POINTS.AUTH}/${END_POINTS.LOGIN}`, params),

}

export const usersRequest = {
    createUserRequest: (params: CreateUserPayload) =>
        apiInstance.post(`${END_POINTS.AUTH}/${params.letter_type}/${END_POINTS.REGISTER}`, params.formData),

    getAllUsersRequest: (params?: GetUsersPayload) =>
        apiInstance.get(END_POINTS.USERS, { params }),

    getUserRequest: (params: GetUserPayload) =>
        apiInstance.get(`${END_POINTS.USERS}/${params.id}`),
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