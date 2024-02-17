import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userAPI";

// url link ex- http://amazon/xxx/xx.com
export const server = import.meta.env.VITE_SERVER
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (mid) => [...mid(), userApi.middleware]
});