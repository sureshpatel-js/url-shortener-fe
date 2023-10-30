import { SAVE_APP_PARAMS_DETAILS } from "./appParamsConstants";
const initialState = {

}
export const appParamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_APP_PARAMS_DETAILS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};