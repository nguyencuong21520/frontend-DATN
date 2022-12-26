import { AnyAction, combineReducers, Reducer } from "redux";
import CourcesReducer, {
  CreateCourseReducer,
  CreateUnitCourseReducer,
  OneCourceDetailReducer,
} from "../../components/Courses/reducer";
import {
  RoleViewAppReducer,
  RoleViewAppVLReducer,
} from "../RoleViewApp/reducer";
import {
  GetAllUserReducer,
  MaskDoneCourse,
  UserEnrollReducer,
  UserFetchInfoReducer,
  UserReducer,
  UserSignUpReducer,
  UserUpdateInfoReducer,
} from "../user/reducer";
export const CLEAR_ALL_REDUCERS = "CLEAR_ALL_REDUCERS";
const state = combineReducers({
  User: UserReducer,
  UserFetchInfoReducer: UserFetchInfoReducer,
  UserSignUp: UserSignUpReducer,
  Cources: CourcesReducer,
  OneCourceDetailReducer: OneCourceDetailReducer,
  RoleViewAppReducer: RoleViewAppReducer,
  UserUpdateInfoReducer: UserUpdateInfoReducer,
  GetAllUserReducer: GetAllUserReducer,
  UserEnrollReducer: UserEnrollReducer,
  MaskDoneCourse: MaskDoneCourse,
  CreateCourseReducer: CreateCourseReducer,
  CreateUnitCourseReducer: CreateUnitCourseReducer,
  RoleViewAppVLReducer: RoleViewAppVLReducer,
});
export type State = ReturnType<typeof state>;
const rootReducer: Reducer = (currentState: State, action: AnyAction) => {
  if (action.type === CLEAR_ALL_REDUCERS) {
    return state(undefined, action);
  }
  return state(currentState, action as unknown as never);
};
export default rootReducer;
