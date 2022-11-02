import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {},
  postsView: "all-posts",
  status: {
    type: "idle",
    editedPost: {},
  },
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog(state, action) {
      state.posts[action.payload.id] = action.payload;
      state.postsView = "all-posts";
    },
    changePostsView(state) {
      state.postsView =
        state.postsView === "all-posts" ? "single-post" : "all-posts";
    },
    incrementLike(state, action) {
      const id = action.payload;

      if (state.posts.hasOwnProperty(id)) {
        state.posts[id] = {
          ...state.posts[id],
          likes: state.posts[id].likes + 1,
        };
      }
    },
    prepareEditPost: {
      prepare(id, post) {
        return {
          payload: { id, post },
        };
      },
      reducer(state, action) {
        const { id, post } = action.payload;

        if (state.posts.hasOwnProperty(id)) {
          state.status.type = "edited";
          state.status.editedPost = post;
        }
      },
    },
    clearStatus(state) {
      state.status.type = "left-editing";
      state.status.editedPost = {};
    },
    actualEditPost: {
      prepare(id, info) {
        return {
          payload: { id, info },
        };
      },
      reducer(state, action) {
        const { id, info } = action.payload;

        if (state.posts.hasOwnProperty(id)) {
          state.posts[id] = info;
          state.status.type = "idle";
          state.status.editedPost = {};
        }
      },
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
export const selectPostsCounts = createSelector(
  (state) => state.blog.posts,
  (posts) => Object.values(posts).length
);
export const selectEditedPost = createSelector(
  (state) => state.blog.status,
  (post) => ({
    type: post.type,
    id: post.editedPost.id,
  })
);

export const {
  addBlog,
  changePostsView,
  incrementLike,
  prepareEditPost,
  clearStatus,
  actualEditPost,
} = blogSlice.actions;

export default blogSlice.reducer;
