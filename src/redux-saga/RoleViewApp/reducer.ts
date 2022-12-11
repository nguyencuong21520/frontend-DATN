import { createReducer } from "../../utils/redux";
export const ROLE_VIEW_REQUEST_ADMIN = "ROLE_VIEW_REQUEST_ADMIN";
export const ROLE_VIEW_SUCCESS_ADMIN = "ROLE_VIEW_SUCCESS_ADMIN";
export const ROLE_VIEW_FAILED_ADMIN = "ROLE_VIEW_FAILED_ADMIN";
export const ROLE_VIEW_CLEAR_ADMIN = "ROLE_VIEW_CLEAR_ADMIN";
const RoleViewAppReducer = createReducer(
  ROLE_VIEW_REQUEST_ADMIN,
  ROLE_VIEW_SUCCESS_ADMIN,
  ROLE_VIEW_FAILED_ADMIN,
  ROLE_VIEW_CLEAR_ADMIN
);
export { RoleViewAppReducer };
