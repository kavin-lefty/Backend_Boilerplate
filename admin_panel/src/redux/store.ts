import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slice";
const store = configureStore({
  reducer: {
    user: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
