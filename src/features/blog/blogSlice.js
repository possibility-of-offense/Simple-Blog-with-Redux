import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {},
  numberOfPosts: 0,
  postsView: "all-posts",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog(state, action) {
      state.posts[action.payload.id] = action.payload;
      state.numberOfPosts++;
      state.postsView = "all-posts";
    },
    changePostsView(state) {
      state.postsView =
        state.postsView === "all-posts" ? "single-post" : "all-posts";
    },
  },
});

export const selectBlogs = createSelector(
  (state) => state.blog.posts,
  (posts) => Object.values(posts)
);
export const selectBlogById = createSelector(
  (state) => state.blog.posts,
  (state, id) => id,
  (posts, id) => {
    if (posts.hasOwnProperty(id)) {
      return posts[id];
    }
  }
);

export const { addBlog, changePostsView } = blogSlice.actions;

export default blogSlice.reducer;
