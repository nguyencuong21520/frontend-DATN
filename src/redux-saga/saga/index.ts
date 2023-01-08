import { all } from "redux-saga/effects";
import queryDataCources, {
  queryCourseVL,
  queryCreateCourseRequest,
  querycreateLessonUnitRequest,
  queryCreateUnitCourseRequest,
  queryDropCourse,
  queryGetOneCourseDetail,
  queryRemoveStudenEnroll,
} from "../course/saga";
import {
  queryAddCommentCourse,
  queryDataUser,
  queryGetAllUser,
  queryMaskDoneCourse,
  queryStudentEnroll,
  queryUserEnrollCourse,
  queryUserFetchInfo,
  queryUsersDashBoard,
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
    querycreateLessonUnitRequest(),
    queryStudentEnroll(),
    queryRemoveStudenEnroll(),
    queryAddCommentCourse(),
    queryCourseVL(),
    queryDropCourse(),
    queryUsersDashBoard()
  ]);
}
