import { useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import { ActiveSchoolYearType, GetAllSchoolYearType } from "redux/school-year/types";

export const useActiveSchoolYear = () : ActiveSchoolYearType =>
    useSelector((state: AppState) => state.Schoolyear.activeSchoolyear.data)

export const useSchoolYears = () : GetAllSchoolYearType =>
    useSelector((state: AppState) => state.Schoolyear.schoolYears)