import { watchRequest } from "../../utils/saga";
import { all, takeLatest } from "redux-saga/effects";
import {
  COURCES_REQUEST_GET_DATA,
  COURCES_GET_SUCCESS,
  COURCES_GET_FAILED,
} from "../../components/Courses/reducer";
import { METHOD } from "../../global/enum";

function* courcesRequest() {
  yield watchRequest(
    "/api/cource",
    METHOD.GET,
    COURCES_GET_SUCCESS,
    COURCES_GET_FAILED
  );
}
export default function* queryDataCources() {
  yield all([takeLatest(COURCES_REQUEST_GET_DATA, courcesRequest)]);
}
