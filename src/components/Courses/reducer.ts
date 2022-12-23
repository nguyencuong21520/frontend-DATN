import { createReducer } from "../../utils/redux";
export const COURCES_REQUEST_GET_DATA = "COURCES_REQUEST_GET_API";
export const COURCES_GET_SUCCESS = "COURCES_GET_SUCCESS";
export const COURCES_GET_FAILED = "COURCES_GET_FAILED";

export const GET_ONE_DETAIL_ONE_COURSE = "GET_ONE_DETAIL_ONE_COURSE";
export const GET_ONE_DETAIL_ONE_COURSE_SUCCESS = "GET_ONE_DETAIL_ONE_COURSE_SUCCESS";
export const GET_ONE_DETAIL_ONE_COURSE_FAILED = "GET_ONE_DETAIL_ONE_COURSE_FAILED";

// example APIs Redux-Saga
const CourcesReducer = createReducer(
    COURCES_REQUEST_GET_DATA,
    COURCES_GET_SUCCESS,
    COURCES_GET_FAILED
);
const OneCourceDetailReducer = createReducer(
    GET_ONE_DETAIL_ONE_COURSE,
    GET_ONE_DETAIL_ONE_COURSE_SUCCESS,
    GET_ONE_DETAIL_ONE_COURSE_FAILED
);


export default CourcesReducer;
export { OneCourceDetailReducer };
