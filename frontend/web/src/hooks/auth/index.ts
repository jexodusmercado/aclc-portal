import { useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import { 
    CreatedState,
    UserDataState,
    UserErrorState,
    UserLoadingState,
    UserAuthenticationState
} from "redux/auth/types";

export const useUserData = (): UserDataState =>
    useSelector((state: AppState) => state.Auth.user.data)

export const useUserAuthenticated = () : UserAuthenticationState =>
    useSelector((state: AppState) => state.Auth.user.authenticated) 

export const useUserError = () : UserErrorState =>
    useSelector((state: AppState) => state.Auth.user.error) 

export const useUserLoading = () : UserLoadingState =>
    useSelector((state: AppState) => state.Auth.user.loading) 

export const useUserCreated = () : CreatedState => 
    useSelector((state: AppState) => state.Auth.createUser)