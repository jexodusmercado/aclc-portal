import { useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import { CreateState, GetAllUsersState } from "redux/users/types";

export const useUserCreated = () : CreateState => 
    useSelector((state: AppState) => state.Users.created)

export const useGetAllUsers = () : GetAllUsersState =>
    useSelector((state: AppState) => state.Users.users)

