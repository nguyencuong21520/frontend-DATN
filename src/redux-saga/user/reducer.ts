import { createReducer } from "../../utils/redux";
export const USER_REQUEST_LOGIN_API = "USER_REQUEST_LOGIN_API";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
export const USER_LOGOUT_CLEAR = "USER_LOGOUT_CLEAR";

export const USER_SIGN_UP_REQUEST = "USER_SIGN_UP_REQUEST";
export const USER_SIGN_UP_SUCCESS = "USER_SIGN_UP_SUCCESS";
export const USER_SIGN_UP_FAILED = "USER_SIGN_UP_FAILED";
// example APIs Redux-Saga
const UserReducer = createReducer(USER_REQUEST_LOGIN_API, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, USER_LOGOUT_CLEAR);

const UserSignUpReducer = createReducer(USER_SIGN_UP_REQUEST, USER_SIGN_UP_SUCCESS, USER_SIGN_UP_FAILED);

export { UserReducer, UserSignUpReducer };