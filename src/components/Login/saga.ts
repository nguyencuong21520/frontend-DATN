import { watchRequest } from "../../utils/saga";
import { all, takeLatest } from 'redux-saga/effects';
import { USER_REQUEST_LOGIN_API, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED } from './reducer';
import { METHOD } from "../../global/enum";
import { Obj } from "../../global/interface";

function* userLogin(payload: Obj) {
    yield watchRequest('/api/user/login', METHOD.POST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, payload.payload.payload.body)
}
export default function* queryDataUser() {
    yield all([takeLatest(USER_REQUEST_LOGIN_API, userLogin)]);
}