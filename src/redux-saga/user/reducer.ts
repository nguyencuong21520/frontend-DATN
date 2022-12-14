import { createReducer } from "../../utils/redux";
export const USER_REQUEST_LOGIN_API = "USER_REQUEST_LOGIN_API";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
export const USER_LOGOUT_CLEAR = "USER_LOGOUT_CLEAR";

export const USER_SIGN_UP_REQUEST = "USER_SIGN_UP_REQUEST";
export const USER_SIGN_UP_SUCCESS = "USER_SIGN_UP_SUCCESS";
export const USER_SIGN_UP_FAILED = "USER_SIGN_UP_FAILED";

export const USER_UPDATE_INFO_REQUEST = "USER_UPDATE_INFO_REQUEST";
export const USER_UPDATE_INFO_SUCCESS = "USER_UPDATE_INFO_SUCCESS";
export const USER_UPDATE_INFO_FAILED = "USER_UPDATE_INFO_FAILED";

export const USER_FETCH_INFO_REQUEST = "USER_FETCH_INFO_REQUEST";
// example APIs Redux-Saga
const UserReducer = createReducer(
  USER_REQUEST_LOGIN_API,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT_CLEAR
);

const UserFetchInfoReducer = createReducer(
  USER_FETCH_INFO_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT_CLEAR
);

const UserSignUpReducer = createReducer(
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAILED
);

const UserUpdateInfoReducer = createReducer(
  USER_UPDATE_INFO_REQUEST,
  USER_UPDATE_INFO_SUCCESS,
  USER_UPDATE_INFO_FAILED
);

export {
  UserReducer,
  UserSignUpReducer,
  UserUpdateInfoReducer,
  UserFetchInfoReducer,
};
