import { Fragment } from "react";
import { FaHeart, FaEdit } from "react-icons/fa";

export default function BlogContentPostsSingleActions({
  incrementing,
  editing,
}) {
  return (
    <Fragment>
      <a href="#!" className="link-muted mx-1">
        <FaEdit onClick={editing} title="edit" size={12} />
      </a>
      <a href="#!" className="link-muted mx-1">
        <FaHeart onClick={incrementing} title="like" size={12} />
      </a>
    </Fragment>
  );
}
