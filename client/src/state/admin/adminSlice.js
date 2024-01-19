import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
};

const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    AdminReducerFunc: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { AdminReducerFunc } = adminSlice.actions;
export default adminSlice.reducer;
