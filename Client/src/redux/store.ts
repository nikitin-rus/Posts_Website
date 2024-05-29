import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

export const store = configureStore({
    reducer: authSlice.reducer
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;