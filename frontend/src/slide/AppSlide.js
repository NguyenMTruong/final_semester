import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createPost: false,
  createComment: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCreatePost: (state, action) => {
      state.createPost = action.payload;
    },
    setCreateComment: (state, action) => {
      state.createComment = action.payload;
    },
  },
});

export const { setCreatePost, setCreateComment } = appSlice.actions;
export default appSlice.reducer;
