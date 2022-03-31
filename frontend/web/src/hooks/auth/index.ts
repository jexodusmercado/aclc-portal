import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthState, UserAuthenticationState, UserDataState, UserErrorState, UserLoadingState } from "redux/auth/types";
import { AppState } from "redux/reducers";

export const useUserData = (): UserDataState => {
    return useSelector((state: AppState) => state.Auth.user.data) 
}

export const useUserAuthenticated = () : UserAuthenticationState => {
    return useSelector((state: AppState) => state.Auth.user.authenticated) 
}

export const useUserError = () : UserErrorState => {
    return useSelector((state: AppState) => state.Auth.user.error) 
}

export const useUserLoading = () : UserLoadingState => {
    return useSelector((state: AppState) => state.Auth.user.loading) 
}
