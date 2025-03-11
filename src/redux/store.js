import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loaderSlice.js";
import darkModeReducer from "./slices/darkModeSlice.js";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    darkMode: darkModeReducer,
  },
});
