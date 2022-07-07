import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../reducers";

export const currentUser        = (state: AppState) => state.Auth.user
export const isAuthenticated    = (state: AppState) => state.Auth.authenticated

const stateSubject = ((state: AppState) => state.Subject.subjects.data)


export const getAuthUser        = createSelector(currentUser, (user) => user)
export const getAuthenticated   = createSelector(isAuthenticated, (auth) => auth)
