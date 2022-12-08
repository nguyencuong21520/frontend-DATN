import { Action } from "../global/interface";

export const createReducer = (request: string, success: string, failed: string, clear?: string) => {
    return (state: Record<string, unknown> | null = null, action: Action) => {
        switch (action.type) {
            case success:
                return {
                    ...state,
                    success: true,
                    pending: false,
                    response: action.payload,
                }
            case failed:
                return {
                    ...state,
                    success: false,
                    pending: false,
                    response: action.payload,
                }
            case request:
                return {
                    ...state,
                    ...action.payload,
                    pending: true,
                    response: null,
                }
            case clear:
                return null;
            default:
                return state;
        }
    }
}