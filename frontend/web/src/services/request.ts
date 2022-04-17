import { END_POINTS } from "services/api";
import { apiInstance } from "services/axios";
import { CreateUserPayload, LoginPayload } from "redux/auth/types";


export const authRequest = {
    
    loginStudentRequest: (params: LoginPayload) => 
        apiInstance.post(`${END_POINTS.AUTH}/${END_POINTS.LOGIN}`, params),

    createUserRequest: (params: CreateUserPayload) =>
        apiInstance.post(`${END_POINTS.AUTH}/${END_POINTS.REGISTER}`, params)

}


