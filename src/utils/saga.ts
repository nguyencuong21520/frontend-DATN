import { call, put } from "redux-saga/effects";
import httpClient from "./axios";
import { METHOD } from "../global/enum";
import { Obj } from "../global/interface";

// get method
const getConfigQuery = (config?: Obj | string | undefined) => {
  return (config as Obj) || {};
};
const getData = (uri?: string, passParameters?: Obj | string | undefined) => {
  // call api
  const response = httpClient.get(uri as string).then(
    (response) => {
      return response;
    },
    (error) => {
      return error.response;
    }
  );
  return response;
};
// post method
const postData = async (
  uri?: string,
  data?: Obj,
  passParameters?: Obj | string | undefined
) => {
  const response = httpClient
    .post(uri as string, data, getConfigQuery(passParameters))
    .then(
      (response) => {
        return response;
      },
      (error) => {
        return error.response;
      }
    );
  return response;
};
// put method
const putData = async (
  uri?: string,
  data?: Obj,
  passParameters?: Obj | string | undefined
) => {
  const response = httpClient
    .put(uri as string, data, getConfigQuery(passParameters))
    .then(
      (response) => {
        return response;
      },
      (error) => {
        return error.response;
      }
    );
  return response;
};

export function* watchRequest(
  uri?: string,
  method?: METHOD,
  success?: string,
  failed?: string,
  bodyRequest?: Obj | undefined,
  passParameters?: Obj | string | undefined
): Generator {
  try {
    let response;
    switch (method) {
      case METHOD.GET:
        response = yield call(getData, uri, passParameters);
        break;
      case METHOD.POST:
        response = yield call(postData, uri, bodyRequest, passParameters);
        break;
      case METHOD.PUT:
        response = yield call(putData, uri, bodyRequest, passParameters);
        break;
      default:
        response = yield call(getData, uri);
        break;
    }
    if (response) {
      if ((response as Obj).data.success) {
        yield put({ payload: (response as Obj).data, type: success as string });
      } else {
        yield put({ payload: (response as Obj).data, type: failed as string });
      }
    } else {
      yield put({ type: failed });
    }
  } catch (error) {
    yield put({ type: failed });
  }
}
