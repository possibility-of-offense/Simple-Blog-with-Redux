import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  changePostsView,
  clearStatus,
  selectEditedPost,
} from "../../../features/blog/blogSlice";

export default function BlogContentActions() {
  const selectPostsView = useSelector(
    (state) => state.blog.postsView,
    shallowEqual
  );

  const dispatch = useDispatch();
  const handleTabClick = () => {
    dispatch(changePostsView());
  };

  const selectBeingEdited = useSelector(selectEditedPost);
  const handleLeaveEditMode = () => {
    dispatch(clearStatus());
  };

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item cursor-pointer">
        <span
          onClick={handleTabClick}
          className={`nav-link${
            selectPostsView === "all-posts" ? " active" : ""
          }`}
        >
          All Posts
        </span>
      </li>

      <li className="nav-item">
        <span
          className={`nav-link disabled${
            selectPostsView === "single-post" ? " active" : ""
          }`}
        >
          Single Post
        </span>
      </li>
      {selectBeingEdited.type === "edited" && (
        <li className="nav-item" onClick={handleLeaveEditMode}>
          <span
            className={`nav-link ${
              selectPostsView === "single-post" ? " active" : ""
            }`}
          >
            Leave edit mode
          </span>
        </li>
      )}
    </ul>
  );
}
