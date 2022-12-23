import { watchRequest } from "../../utils/saga";
import { all, takeLatest } from "redux-saga/effects";
import {
  COURCES_REQUEST_GET_DATA,
  COURCES_GET_SUCCESS,
  COURCES_GET_FAILED,
  GET_ONE_DETAIL_ONE_COURSE_SUCCESS,
  GET_ONE_DETAIL_ONE_COURSE_FAILED,
  GET_ONE_DETAIL_ONE_COURSE,
} from "../../components/Courses/reducer";
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

export default function* queryDataCources() {
  yield all([takeLatest(COURCES_REQUEST_GET_DATA, courcesRequest)]);
}
export function* queryGetOneCourseDetail() {
  yield all([takeLatest(GET_ONE_DETAIL_ONE_COURSE, getOneCourseDetail)]);
}
