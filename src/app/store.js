import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "../features/blog/blogSlice";

export const store = configureStore({
  reducer: {
    blog: blogSlice,
  },
});
