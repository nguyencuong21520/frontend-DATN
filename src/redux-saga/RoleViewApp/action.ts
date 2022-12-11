import { Action } from "../../global/interface";

export const RoleViewAppAction = (payload: Action) => {
  return {
    type: payload.type,
    payload: payload,
  };
};
