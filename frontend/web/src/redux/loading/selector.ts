import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "redux/reducers";

export const loading = (state: AppState) => state.Loading

export const isLoading = (actions: string[]) => createSelector(loading, (load) => actions.some(action => load[action]))