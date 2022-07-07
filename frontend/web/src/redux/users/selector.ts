import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "redux/reducers";

const users = (state: AppState) => state.Users.users;
const user = (state: AppState) => state.Users.user;

export const getUsers = createSelector(users, (users) => users);
export const getUser  = createSelector(user, (user) => user);