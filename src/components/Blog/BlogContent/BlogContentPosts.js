import { useDispatch, useSelector } from "react-redux";
import {
  changePostsView,
  selectBlogs as memoizedBlogs,
} from "../../../features/blog/blogSlice";
import BlogContentPostsSingle from "./BlogContentPostsSingle";
import BlogContentPostsSingleActions from "./BlogContentPostsSingleActions";

export default function BlogContentPosts({ onToggleShowList, onSetBlogId }) {
  const selectBlogs = useSelector(memoizedBlogs);
  const dispatch = useDispatch();

  const handleBlogPostClick = (id) => {
    dispatch(changePostsView());
    onToggleShowList((prev) => !prev);
    onSetBlogId(id);
  };

  return (
    <div>
      {selectBlogs.length > 0 && (
        <div className="list-group">
          {selectBlogs.map((blog, i) => (
            <BlogContentPostsSingle
              key={blog.id}
              classes={`list-group-item list-group-item-action${
                i === 0 ? " bg-light" : ""
              }`}
              onClick={() => handleBlogPostClick(blog.id)}
            >
              <div className="row">
                <p className="col-8 m-0">
                  <span>{blog.title}</span> &nbsp;
                  <span>
                    <BlogContentPostsSingleActions />
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
