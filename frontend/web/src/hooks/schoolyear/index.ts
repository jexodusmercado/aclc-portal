import { List } from "interfaces";
import { useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import { ActiveSchoolYearState, GetAllSchoolYearState } from "redux/school-year/types";

export const useActiveSchoolYear = () : ActiveSchoolYearState =>
    useSelector((state: AppState) => state.Schoolyear.activeSchoolyear.data)

export const useSchoolYears = () : GetAllSchoolYearState =>
    useSelector((state: AppState) => state.Schoolyear.schoolYears)

export const useFilteredSchoolYears = () : List[] => {
    const stateSchoolYear = useSelector((state: AppState) => state.Schoolyear.schoolYears)

    const filtered = stateSchoolYear.data.map((schoolYear) => {
        return {
            id:     schoolYear.ID,
            name:   schoolYear.semester + " " + schoolYear.school_year
        }
    })

    return filtered
}