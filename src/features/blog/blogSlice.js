import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {},
  postsView: "all-posts",
  status: {
    type: "idle",
    editedPost: {},
  },
  lastPersonsAddedBlog: {
    name: "",
    onLiked: false,
    likedBlogs: [],
  },
  post_ids: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog(state, action) {
      state.posts[action.payload.id] = action.payload;
      state.postsView = "all-posts";
      state.post_ids.push(action.payload.id);

      state.lastPersonsAddedBlog = {
        name: action.payload.author,
        onLiked: false,
        likedBlogs: [],
      };
    },
    changePostsView: {
      prepare(view) {
        return { payload: view };
      },
      reducer(state, action) {
        state.postsView = action.payload;
      },
    },
    // changePostsView() {
    //   state.postsView =
    //   state.postsView === "all-posts" ? "single-post" : "all-posts";
    // },
    incrementLike: {
      prepare(id) {
        return { payload: { id } };
      },
      reducer(state, action) {
        const { id } = action.payload;

        // When the blog is being added updated the lastPersonAddedBlog
        // When the increment icon is being clicked, check for the lastPersonAddedBlog.likedBlogs list
        // if the id is not present in there, update the likes of the blog
        if (state.posts.hasOwnProperty(id)) {
          if (!state.lastPersonsAddedBlog.likedBlogs.includes(id)) {
            state.posts[id] = {
              ...state.posts[id],
              likes: state.posts[id].likes + 1,
            };
            state.lastPersonsAddedBlog.onLiked = true;
            state.lastPersonsAddedBlog.likedBlogs.push(id);
          }
        }
      },
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
          state.posts[id] = {
            ...info,
            tags: state.posts[id].tags.concat(info.tags),
          };
          state.status.type = "idle";
          state.status.editedPost = {};
        }
      },
    },
  },
});

export const selectPostById = createSelector(
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
