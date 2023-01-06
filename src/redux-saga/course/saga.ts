import { watchRequest } from "../../utils/saga";
import { all, takeLatest } from "redux-saga/effects";
import {
  COURCES_REQUEST_GET_DATA,
  COURCES_GET_SUCCESS,
  COURCES_GET_FAILED,
  GET_ONE_DETAIL_ONE_COURSE_SUCCESS,
  GET_ONE_DETAIL_ONE_COURSE_FAILED,
  GET_ONE_DETAIL_ONE_COURSE,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILED,
  CREATE_COURSE_REQUEST,
  CREATE_UNIT_COURSE_SUCCESS,
  CREATE_UNIT_COURSE_FAILED,
  CREATE_UNIT_COURSE_REQUEST,
  CREATE_LESSON_UNIT_REQUEST,
  CREATE_LESSON_UNIT_SUCCESS,
  CREATE_LESSON_UNIT_FAILED,
  REMOVE_STUDENT_ENROLL_SUCCESS,
  REMOVE_STUDENT_ENROLL_FAILED,
  REMOVE_STUDENT_ENROLL_REQUEST,
  GET_COURSE_VL_FAILED,
  GET_COURSE_VL_SUCCESS,
  GET_COURSE_VL,
} from "./reducer";
import { METHOD } from "../../global/enum";
import { Obj } from "../../global/interface";

function* courcesRequest() {
  yield watchRequest(
    "/api/course/auth",
    METHOD.GET,
    COURCES_GET_SUCCESS,
    COURCES_GET_FAILED
  );
}

function* getOneCourseDetail(payload: Obj) {
  yield watchRequest(
    `/api/course/auth/${payload.payload.payload.body._idCourse}`,
    METHOD.GET,
    GET_ONE_DETAIL_ONE_COURSE_SUCCESS,
    GET_ONE_DETAIL_ONE_COURSE_FAILED
  );
}

function* createCourseRequest(payload: Obj) {
  yield watchRequest(
    `/api/course/create`,
    METHOD.POST,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_FAILED,
    payload.payload.payload.body
  );
}

function* createUnitCourseRequest(payload: Obj) {
  yield watchRequest(
    `/api/unit/create/${payload.payload.payload.params._idCourse}`,
    METHOD.POST,
    CREATE_UNIT_COURSE_SUCCESS,
    CREATE_UNIT_COURSE_FAILED,
    payload.payload.payload.body
  );
}

function* createLessonUnitRequest(payload: Obj) {
  yield watchRequest(
    `/api/lesson/create/${payload.payload.payload.params._idUnit}`,
    METHOD.POST,
    CREATE_LESSON_UNIT_SUCCESS,
    CREATE_LESSON_UNIT_FAILED,
    payload.payload.payload.body
  );
}

function* removeStudentEnrollRequest(payload: Obj) {
  yield watchRequest(
    `/api/course/remove/${payload.payload.payload.params._idCourse}`,
    METHOD.PUT,
    REMOVE_STUDENT_ENROLL_SUCCESS,
    REMOVE_STUDENT_ENROLL_FAILED,
    payload.payload.payload.body
  );
}

function* CourseVLRequest(payload: Obj) {
  yield watchRequest(
    `/api/course`,
    METHOD.GET,
    GET_COURSE_VL_SUCCESS,
    GET_COURSE_VL_FAILED
  );
}

export default function* queryDataCources() {
  yield all([takeLatest(COURCES_REQUEST_GET_DATA, courcesRequest)]);
}
export function* queryGetOneCourseDetail() {
  yield all([takeLatest(GET_ONE_DETAIL_ONE_COURSE, getOneCourseDetail)]);
}

export function* queryCreateCourseRequest() {
  yield all([takeLatest(CREATE_COURSE_REQUEST, createCourseRequest)]);
}

export function* queryCreateUnitCourseRequest() {
  yield all([takeLatest(CREATE_UNIT_COURSE_REQUEST, createUnitCourseRequest)]);
}

export function* querycreateLessonUnitRequest() {
  yield all([takeLatest(CREATE_LESSON_UNIT_REQUEST, createLessonUnitRequest)]);
}

export function* queryRemoveStudenEnroll() {
  yield all([
    takeLatest(REMOVE_STUDENT_ENROLL_REQUEST, removeStudentEnrollRequest),
  ]);
}

export function* queryCourseVL() {
  yield all([takeLatest(GET_COURSE_VL, CourseVLRequest)]);
}
