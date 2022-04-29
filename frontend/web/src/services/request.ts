import { END_POINTS } from "services/api";
import { apiInstance } from "services/axios";
import { LoginPayload } from "redux/auth/types";
import { CreateUserPayload, GetUserPayload, GetUsersPayload } from "redux/users/types";
import { CreateCoursePayload } from "redux/courses/types";
import { CreateSchoolYearPayload } from "redux/school-year/types";


export const authRequest = {
    
    loginStudentRequest: (params: LoginPayload) => 
        apiInstance.post(`${END_POINTS.AUTH}/${END_POINTS.LOGIN}`, params),

}

export const usersRequest = {
    createUserRequest: (params: CreateUserPayload) =>
        apiInstance.post(`${END_POINTS.AUTH}/${params.letter_type}/${END_POINTS.REGISTER}`, params),

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
}