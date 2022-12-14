import { AnyAction, combineReducers, Reducer } from "redux";
import CourcesReducer from "../../components/Courses/reducer";
import { RoleViewAppReducer } from "../RoleViewApp/reducer";
import {
  UserFetchInfoReducer,
  UserReducer,
  UserSignUpReducer,
  UserUpdateInfoReducer,
} from "../user/reducer";

const state = combineReducers({
  User: UserReducer,
  UserFetchInfoReducer: UserFetchInfoReducer,
  UserSignUp: UserSignUpReducer,
  Cources: CourcesReducer,
  RoleViewAppReducer: RoleViewAppReducer,
  UserUpdateInfoReducer: UserUpdateInfoReducer,
});
export type State = ReturnType<typeof state>;
const rootReducer: Reducer = (currentState: State, action: AnyAction) => {
  return state(currentState, action as unknown as never);
};
export default rootReducer;
