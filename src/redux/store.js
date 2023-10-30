import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from "./user/userReducer";
import { appParamsReducer } from './appParams/appParamsReducer';
export const store = configureStore({
    reducer: {
        user: userReducer,
        appParams: appParamsReducer
    }
})