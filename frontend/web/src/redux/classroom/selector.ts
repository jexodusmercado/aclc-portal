import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "redux/reducers";

export const studentState       = (state: AppState) => state.Classroom.students
export const classroomsState    = (state: AppState) => state.Classroom.classrooms

export const getStudents        = createSelector(studentState, (students) => students)
export const getCourseFilter    = createSelector(studentState, (students) => students.map(student => ({id: student.course.ID, name: student.course.name})))
export const getClassroomFilter = createSelector(studentState, (students) => students.map(student => student.classroom.map(classroom => ({id: classroom.id, name: classroom.title}))))
export const getClassrooms      = createSelector(classroomsState, (val) => val)