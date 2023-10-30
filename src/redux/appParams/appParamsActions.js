import { SAVE_APP_PARAMS_DETAILS } from "./appParamsConstants"
export const saveAppParamsData = (payload) => {
    return {
        type: SAVE_APP_PARAMS_DETAILS,
        payload
    }
}