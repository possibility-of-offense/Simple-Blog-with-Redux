import BlogViewPostsListItemActions from "./BlogViewPostsListItemActions";

import { selectPostById as memoizeSelectById } from "../../../features/blog/blogSlice";
import { useSelector } from "react-redux";

export default function BlogViewPostsListItem({ classes, blog, callbacks }) {
  const selectPostById = useSelector((state) => memoizeSelectById(state, blog));

  return (
    <div className={classes} aria-current="true">
      <div className="row">
        <p className="col-8 m-0">
          <span
            className="text-decoration-underline cursor-pointer"
            onClick={() => callbacks.click(selectPostById.id)}
          >
            {selectPostById.title}
          </span>
          &nbsp;
          <span>
            <BlogViewPostsListItemActions
              incrementing={() =>
                callbacks.increment(selectPostById.id, selectPostById.author)
              }
              editing={() =>
                callbacks.edited(selectPostById.id, selectPostById)
              }
            />
          </span>
        </p>
        <p className="col-4 m-0 text-end" style={{ fontSize: "13px" }}>
          <span className="text-decoration-underline">
            by {selectPostById.author} <br />
          </span>
          <small style={{ fontSize: "9px" }}>{selectPostById.date}</small>
        </p>
      </div>
    </div>
  );
}
