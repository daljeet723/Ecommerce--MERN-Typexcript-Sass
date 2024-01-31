import {configureStore} from "@reduxjs/toolkit";

// url link ex- http://amazon/xxx/xx.com
export const server= import.meta.env.VITE_SERVER
export const store = configureStore({
    reducer:{}
});