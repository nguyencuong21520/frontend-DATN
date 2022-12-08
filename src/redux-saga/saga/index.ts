import { all } from "redux-saga/effects";
import queryDataCources from "../../components/Courses/saga";
import { queryDataUser, signUpUser } from "../user/saga";

export function* rootSaga() {
    yield all([
        queryDataUser(),
        queryDataCources(),
        signUpUser(),
    ]);
}