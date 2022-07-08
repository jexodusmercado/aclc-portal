import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../reducers";

const grade = (state: AppState) => state.Grade.grade

export const getGrade    = createSelector(grade, (grade) => grade)
