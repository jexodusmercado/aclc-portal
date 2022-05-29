import { useSelector } from "react-redux";
import { ClassroomState } from "redux/classroom/types";
import { AppState } from "redux/reducers";

export const useGetAllClassroom = (): ClassroomState['classrooms'] =>
    useSelector((state : AppState) => state.Classroom.classrooms)

export const useGetClassroom = () : ClassroomState['classroom'] =>
    useSelector((state: AppState) => state.Classroom.classroom)