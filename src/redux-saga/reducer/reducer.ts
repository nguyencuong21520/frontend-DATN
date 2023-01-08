import { AnyAction, combineReducers, Reducer } from "redux";
import CourcesReducer, {
  CreateCourseReducer,
  CreateLessonUnitReducer,
  CreateUnitCourseReducer,
  DropCourseReducer,
  OneCourceDetailReducer,
  RemoveStudentEnrollReducer,
} from "../course/reducer";

import {
  RoleViewAppReducer,
  RoleViewAppVLReducer,
} from "../RoleViewApp/reducer";
import {
  AddCommentCourseReducer,
  AddStudentEnrollReducer,
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
  CreateLessonUnitReducer: CreateLessonUnitReducer,
  AddStudentEnrollReducer: AddStudentEnrollReducer,
  RemoveStudentEnrollReducer: RemoveStudentEnrollReducer,
  AddCommentCourseReducer: AddCommentCourseReducer,
  DropCourseReducer: DropCourseReducer
});
export type State = ReturnType<typeof state>;
const rootReducer: Reducer = (currentState: State, action: AnyAction) => {
  if (action.type === CLEAR_ALL_REDUCERS) {
    return state(undefined, action);
  }
  return state(currentState, action as unknown as never);
};
export default rootReducer;
