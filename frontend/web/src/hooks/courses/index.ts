import { GetCoursesState, GetCreatedState } from "redux/courses/types";
import { AppState } from "redux/reducers";
import { useSelector } from "react-redux";

export const useCoursesState = () : GetCoursesState => 
    useSelector((state: AppState) => state.Courses.courses)

export const useCourseCreated = () : GetCreatedState =>
    useSelector((state: AppState) => state.Courses.created)