import { List } from "interfaces";
import { useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import { SubjectState } from "redux/subject/types";

export const useGetAllSubjects = () : SubjectState['subjects'] =>
    useSelector((state: AppState) => state.Subject.subjects)

export const useFilteredSubjects = () : List[] => {
    const stateSubject = useSelector((state: AppState) => state.Subject.subjects)

    const filtered = stateSubject.data.map((subject) => {
        return {
            id:  subject.ID,
            name:   subject.name
        }
    })

    return filtered
}