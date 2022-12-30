import { Action } from "../../global/interface";

export const CourcesAction = (payload: Action) => {
    return {
        type: payload.type,
        payload: payload
    }
}