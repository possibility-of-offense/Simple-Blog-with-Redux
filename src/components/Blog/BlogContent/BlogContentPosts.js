import { useDispatch, useSelector } from "react-redux";
import {
  changePostsView,
  selectBlogs as memoizedBlogs,
  selectEditedPost,
} from "../../../features/blog/blogSlice";
import BlogContentPostsSingle from "./BlogContentPostsSingle";
import BlogContentPostsSingleActions from "./BlogContentPostsSingleActions";
import {
  prepareEditPost,
  incrementLike,
} from "../../../features/blog/blogSlice";
import { useCallback } from "react";

export default function BlogContentPosts({ onToggleShowList, onSetBlogId }) {
  const selectBlogs = useSelector(memoizedBlogs);
  const selectBeingEdited = useSelector(selectEditedPost);

  const dispatch = useDispatch();

  const handleBlogPostClick = (id) => {
    if (id === selectBeingEdited.id) return;
    dispatch(changePostsView());
    onToggleShowList((prev) => !prev);
    onSetBlogId(id);
  };

  const handleIncrementLikes = (id) => {
    dispatch(incrementLike(id));
  };

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

  return (
    <div>
      {selectBlogs.length > 0 && (
        <div className="list-group">
          {selectBlogs.map((blog, i) => (
            <BlogContentPostsSingle
              key={blog.id}
              classes={`${appendClass(
                blog.id
              )} list-group-item list-group-item-action${
                i === 0 ? " bg-light" : ""
              }`}
            >
              <div className="row">
                <p className="col-8 m-0">
                  <span
                    className="text-decoration-underline cursor-pointer"
                    onClick={() => handleBlogPostClick(blog.id)}
                  >
                    {blog.title}
                  </span>{" "}
                  &nbsp;
                  <span>
                    <BlogContentPostsSingleActions
                      incrementing={() =>
                        handleIncrementLikes(blog.id, blog.author)
                      }
                      editing={() => handleEditedPost(blog.id, blog)}
                    />
                  </span>
                </p>
                <p className="col-4 m-0 text-end" style={{ fontSize: "13px" }}>
                  <span className="text-decoration-underline">
                    by {blog.author} <br />
                  </span>
                  <small style={{ fontSize: "9px" }}>{blog.date}</small>
                </p>
              </div>
            </BlogContentPostsSingle>
          ))}
        </div>
      )}
    </div>
  );
}
