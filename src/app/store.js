import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "../features/blog/blogSlice";
import tagsSlice from "../features/tags/tagsSlice";

export const store = configureStore({
  reducer: {
    blog: blogSlice,
    tags: tagsSlice,
  },
});
