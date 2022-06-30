import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../reducers";

export const currentUser        = (state: AppState) => state.Auth.user
export const isAuthenticated    = (state: AppState) => state.Auth.authenticated
export const isLoading          = (state: AppState) => state.Auth.loading
export const isError            = (state: AppState) => state.Auth.error

export const getAuthError       = createSelector(isError, (error) => error)
export const getAuthUser        = createSelector(currentUser, (user) => user)
export const getAuthenticated   = createSelector(isAuthenticated, (auth) => auth)
export const getAuthLoading     = createSelector(isLoading, (loading) => loading)
