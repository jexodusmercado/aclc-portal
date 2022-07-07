import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "redux/reducers";

export const error = (state: AppState) => state.Error;

export const isError = (action: string) => createSelector(error, (val) => val[action])