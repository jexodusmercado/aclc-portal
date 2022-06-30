import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../reducers";

export const quiz       = (state: AppState) => state.Quiz.quiz
export const quizzes    = (state: AppState) => state.Quiz.quizzes

export const getQuiz        = createSelector(quiz, (quiz) => quiz)
export const getQuizzes     = createSelector(quizzes, (quizzes) => quizzes)
