import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  changePostsView,
  clearStatus,
  selectEditedPost,
} from "../../../features/blog/blogSlice";
import CloseIcon from "../../UI/CloseIcon";

export default function BlogContentActions() {
  const selectPostsView = useSelector(
    (state) => state.blog.postsView,
    shallowEqual
  );

  // Check if postsTag from the state slice was updated
  const selectPostsTag = useSelector((state) => state.blog.postsTag);

  const dispatch = useDispatch();
  const handleTabClick = () => {
    if (!selectPostsTag) {
      dispatch(changePostsView("all-posts"));
    }
  };

  const selectBeingEdited = useSelector(selectEditedPost);
  const handleLeaveEditMode = () => {
    dispatch(clearStatus());
  };

  // remove tag filter
  function handleRemoveTaggedFilter(e) {
    e.stopPropagation();
    dispatch(changePostsView("all-posts"));
  }

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item cursor-pointer">
        <span
          onClick={handleTabClick}
          className={`nav-link${
            selectPostsView === "all-posts" ? " active" : ""
          }`}
        >
          Posts{" "}
          {selectPostsView === "tags" && (
            <span>
              with tag:{" "}
              <CloseIcon onClick={handleRemoveTaggedFilter}>
                {selectPostsTag}
              </CloseIcon>
            </span>
          )}
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
        <li className="nav-item cursor-pointer" onClick={handleLeaveEditMode}>
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
