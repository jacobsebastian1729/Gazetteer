import { configureStore } from "@reduxjs/toolkit";

import countriesReducer from "./slice/countrySlice";

const store = configureStore({
  reducer: {
    countryList: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
