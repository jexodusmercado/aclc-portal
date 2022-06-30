import { AnyAction } from "@reduxjs/toolkit";
import { AppState } from "redux/reducers";

export const useLoading = (actions:string[]) => (state: AppState) => actions.some(action => state.Loading[action])  