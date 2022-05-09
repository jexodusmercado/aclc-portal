import { useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import { ActiveSchoolYearState, GetAllSchoolYearState } from "redux/school-year/types";

export const useActiveSchoolYear = () : ActiveSchoolYearState =>
    useSelector((state: AppState) => state.Schoolyear.activeSchoolyear.data)

export const useSchoolYears = () : GetAllSchoolYearState =>
    useSelector((state: AppState) => state.Schoolyear.schoolYears)