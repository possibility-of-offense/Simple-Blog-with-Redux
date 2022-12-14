import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  prepareEditPost,
  selectEditedPost,
  selectPostsByTag,
  incrementLike,
  changePostsView,
} from "../../../features/blog/blogSlice";

import BlogViewPostsList from "./BlogViewPostsList";
import BlogViewPostsListItem from "./BlogViewPostsListItem";

export default function BlogViewPosts({
  onToggleShowList,
  onSetBlogId,
  toShowPostsWithTags,
}) {
  // Select all blogs
  const selectBlogs = useSelector((state) => state.blog.post_ids);

  // Select the edited state
  const selectBeingEdited = useSelector(selectEditedPost);

  const dispatch = useDispatch();

  // Click on the post list item
  const handleBlogPostClick = (id) => {
    if (id === selectBeingEdited.id) return;
    dispatch(changePostsView("single-post"));
    onToggleShowList((prev) => !prev);
    onSetBlogId(id);
  };

  // Select the picked tag
  const selectPostsTag = useSelector((state) => state.blog.postsTag);

  // Select blogs with tags
  const selectBlogsWithTags = useSelector((state) =>
    selectPostsByTag(state, selectPostsTag)
  );

  // Increment likes
  const handleIncrementLikes = (id) => {
    dispatch(incrementLike(id));
  };

  // Handle clicking the edit icon
  const handleEditedPost = (id, post) => {
    dispatch(
      prepareEditPost(id, {
        id: id,
        author: post.author,
        title: post.title,
        content: post.content,
      })
    );
  };

  // Append classes based on the edited state
  const appendClass = useCallback(
    (id) => {
      const editedClass =
        selectBeingEdited.type === "edited" &&
        selectBeingEdited.id === id &&
        "being-edited";
      return editedClass;
    },
    [selectBeingEdited]
  );

  const callbacks = {
    click: handleBlogPostClick,
    increment: handleIncrementLikes,
    edited: handleEditedPost,
  };

  return (
    <div>
      {selectBlogsWithTags.length > 0 ? (
        <div className="list-group">
          <BlogViewPostsList>
            {selectBlogsWithTags.map((blog, i) => (
              <BlogViewPostsListItem
                key={blog}
                classes={`${appendClass(
                  blog
                )} list-group-item list-group-item-action${
                  i === 0 ? " bg-light" : ""
                }`}
                blog={blog}
                callbacks={callbacks}
              />
            ))}
          </BlogViewPostsList>
        </div>
      ) : (
        selectBlogs.length > 0 && (
          <div className="list-group">
            <BlogViewPostsList>
              {selectBlogs.map((blog, i) => (
                <BlogViewPostsListItem
                  key={blog}
                  classes={`${appendClass(
                    blog
                  )} list-group-item list-group-item-action${
                    i === 0 ? " bg-light" : ""
                  }`}
                  blog={blog}
                  callbacks={callbacks}
                />
              ))}
            </BlogViewPostsList>
          </div>
        )
      )}
    </div>
  );
}
