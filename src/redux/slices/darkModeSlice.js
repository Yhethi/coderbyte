import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActivated: true,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    darkModeActived: (state, action) => {
      state.isActivated = action.payload;
    },
  },
});

export const { darkModeActived } = darkModeSlice.actions;
export default darkModeSlice.reducer;
