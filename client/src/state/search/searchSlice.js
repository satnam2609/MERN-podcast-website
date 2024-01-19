import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const searchSlice = createSlice({
  name: "Search",
  initialState,
  reducers: {
    setInputSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { setInputSearch } = searchSlice.actions;
