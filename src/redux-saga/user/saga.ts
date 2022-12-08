import { watchRequest } from "../../utils/saga";
import { all, takeLatest } from 'redux-saga/effects';
import { USER_REQUEST_LOGIN_API, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, USER_SIGN_UP_REQUEST, USER_SIGN_UP_SUCCESS, USER_SIGN_UP_FAILED } from './reducer';
import { METHOD } from "../../global/enum";
import { Obj } from "../../global/interface";

function* userLogin(payload: Obj) {
    yield watchRequest('/api/user/login', METHOD.POST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, payload.payload.payload.body)
}
function* userSignUp(payload: Obj) {
    yield watchRequest('/api/user/create', METHOD.POST, USER_SIGN_UP_SUCCESS, USER_SIGN_UP_FAILED, payload.payload.payload.body)
}


export function* queryDataUser() {
    yield all([takeLatest(USER_REQUEST_LOGIN_API, userLogin)]);
}

export function* signUpUser() {
    yield all([takeLatest(USER_SIGN_UP_REQUEST, userSignUp)]);
}

