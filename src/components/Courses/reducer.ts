import { createReducer } from "../../utils/redux";
export const COURCES_REQUEST_GET_DATA = "COURCES_REQUEST_GET_API";
export const COURCES_GET_SUCCESS = "COURCES_GET_SUCCESS";
export const COURCES_GET_FAILED = "COURCES_GET_FAILED";


// example APIs Redux-Saga
const CourcesReducer = createReducer(COURCES_REQUEST_GET_DATA, COURCES_GET_SUCCESS, COURCES_GET_FAILED);
export default CourcesReducer;