import { all } from "redux-saga/effects";
import queryDataCources, { queryCreateCourseRequest, querycreateLessonUnitRequest, queryCreateUnitCourseRequest, queryGetOneCourseDetail } from "../course/saga";
import {
  queryDataUser,
  queryGetAllUser,
  queryMaskDoneCourse,
  queryUserEnrollCourse,
  queryUserFetchInfo,
  signUpUser,
  updateInfoUser,
} from "../user/saga";

export function* rootSaga() {
  yield all([
    queryDataUser(),
    queryDataCources(),
    signUpUser(),
    updateInfoUser(),
    queryUserFetchInfo(),
    queryGetAllUser(),
    queryUserEnrollCourse(),
    queryGetOneCourseDetail(),
    queryMaskDoneCourse(),
    queryCreateCourseRequest(),
    queryCreateUnitCourseRequest(),
    querycreateLessonUnitRequest()
  ]);
}
