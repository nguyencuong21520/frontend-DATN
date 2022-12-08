import { Action } from "../../global/interface";

export const UserAction = (payload: Action) => {
    return {
        type: payload.type,
        payload: payload
    }
}