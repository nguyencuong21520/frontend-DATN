import { watchRequest } from "../../utils/saga";
import { all, takeLatest } from "redux-saga/effects";
import {
  USER_REQUEST_LOGIN_API,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAILED,
  USER_UPDATE_INFO_REQUEST,
  USER_UPDATE_INFO_SUCCESS,
  USER_UPDATE_INFO_FAILED,
  USER_FETCH_INFO_REQUEST,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILED,
  USER_ENROLL_FAILED,
  USER_ENROLL_SUCCESS,
  USER_ENROLL_REQUEST,
  MASK_DONE_COURSE_QUERY,
  MASK_DONE_COURSE_FAILED,
  MASK_DONE_COURSE_SUCCESS,
  ADD_STUDENT_ENROLL_REQUEST,
  ADD_STUDENT_ENROLL_SUCCESS,
  ADD_STUDENT_ENROLL_FAILED,
} from "./reducer";
import { METHOD } from "../../global/enum";
import { Obj } from "../../global/interface";

function* userLogin(payload: Obj) {
  yield watchRequest(
    "/api/user/login",
    METHOD.POST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    payload.payload.payload.body
  );
}
function* userFetchInfo(payload: Obj) {
  yield watchRequest(
    "/api/user/me",
    METHOD.GET,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED
  );
}
function* userSignUp(payload: Obj) {
  yield watchRequest(
    "/api/user/create",
    METHOD.POST,
    USER_SIGN_UP_SUCCESS,
    USER_SIGN_UP_FAILED,
    payload.payload.payload.body
  );
}
function* userUpdateInfo(payload: Obj) {
  yield watchRequest(
    `/api/user/update/${payload.payload.payload.params._id}`,
    METHOD.PUT,
    USER_UPDATE_INFO_SUCCESS,
    USER_UPDATE_INFO_FAILED,
    payload.payload.payload.body
  );
}

function* getAllUser() {
  yield watchRequest(
    `/api/user`,
    METHOD.GET,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILED
  );
}

function* userEnrollCourse(payload: Obj) {
  yield watchRequest(
    `/api/course/enroll/${payload.payload.payload.params._idCourse}`,
    METHOD.PUT,
    USER_ENROLL_SUCCESS,
    USER_ENROLL_FAILED
  );
}

function* maskDoneSourse(payload: Obj) {
  yield watchRequest(
    `/api/user/addLessonDone`,
    METHOD.PUT,
    MASK_DONE_COURSE_SUCCESS,
    MASK_DONE_COURSE_FAILED,
    payload.payload.payload.body
  );
}

function* addStudentEnroll(payload: Obj) {
  yield watchRequest(
    `/api/course/accept/${payload.payload.payload.params._idCourse}`,
    METHOD.PUT,
    ADD_STUDENT_ENROLL_SUCCESS,
    ADD_STUDENT_ENROLL_FAILED,
    payload.payload.payload.body
  );
}

export function* queryDataUser() {
  yield all([takeLatest(USER_REQUEST_LOGIN_API, userLogin)]);
}
export function* queryUserFetchInfo() {
  yield all([takeLatest(USER_FETCH_INFO_REQUEST, userFetchInfo)]);
}

export function* signUpUser() {
  yield all([takeLatest(USER_SIGN_UP_REQUEST, userSignUp)]);
}
export function* updateInfoUser() {
  yield all([takeLatest(USER_UPDATE_INFO_REQUEST, userUpdateInfo)]);
}
export function* queryGetAllUser() {
  yield all([takeLatest(GET_ALL_USER_REQUEST, getAllUser)]);
}
export function* queryUserEnrollCourse() {
  yield all([takeLatest(USER_ENROLL_REQUEST, userEnrollCourse)]);
}
export function* queryMaskDoneCourse() {
  yield all([takeLatest(MASK_DONE_COURSE_QUERY, maskDoneSourse)]);
}
export function* queryStudentEnroll() {
  yield all([takeLatest(ADD_STUDENT_ENROLL_REQUEST, addStudentEnroll)]);
}