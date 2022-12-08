import { createReducer } from "../../utils/redux";
export const USER_REQUEST_LOGIN_API = "USER_REQUEST_LOGIN_API";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
export const USER_LOGOUT_CLEAR = "USER_LOGOUT_CLEAR";

// example APIs Redux-Saga
const UserReducer = createReducer(USER_REQUEST_LOGIN_API, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, USER_LOGOUT_CLEAR);
export default UserReducer;