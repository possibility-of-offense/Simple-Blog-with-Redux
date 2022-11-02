import { Fragment } from "react";
import { FaHeart, FaEdit } from "react-icons/fa";

export default function BlogContentPostsSingleActions() {
  return (
    <Fragment>
      <a href="#!" className="link-muted mx-1">
        <FaEdit size={12} />
      </a>
      <a href="#!" className="link-muted mx-1">
        <FaHeart size={12} />
      </a>
    </Fragment>
  );
}
