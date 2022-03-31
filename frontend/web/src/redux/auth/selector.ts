import { AppState } from "../reducers";

export const currentUser        = (state: AppState) => state.Auth.user.data
export const isAuthenticated    = (state: AppState) => state.Auth.user.authenticated
export const isLoading          = (state: AppState) => state.Auth.user.loading
export const isError            = (state: AppState) => state.Auth.user.error