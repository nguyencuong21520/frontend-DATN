import { all } from "redux-saga/effects";
import queryDataCources from "../course/saga";
import {
  queryDataUser,
  queryGetAllUser,
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
  ]);
}
