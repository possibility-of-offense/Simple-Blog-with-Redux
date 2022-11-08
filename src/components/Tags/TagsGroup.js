import { nanoid } from "nanoid";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { changePostsView } from "../../features/blog/blogSlice";

export default function TagsGroup({ tags, greenify }) {
  const mappedTags = tags.map((el) => ({ id: nanoid(), tag: el }));

  const dispatch = useDispatch();
  function handleSpanClick() {
    dispatch(changePostsView("tags"));
  }

  return (
    <div className="mt-2">
      {mappedTags.length > 0 &&
        mappedTags.map((tag) => (
          <Fragment key={tag.id}>
            <span
              onClick={handleSpanClick}
              className={`cursor-pointer badge text-bg-${
                greenify ? "success" : "light"
              } md-shadow-1`}
            >
              {tag.tag}
            </span>
            &nbsp;
          </Fragment>
        ))}
    </div>
  );
}
