import { Fragment, useState } from "react";
import { FaHeart, FaEdit } from "react-icons/fa";
import IncrementerTooltip from "../../UI/IncrementerTooltip";

import classes from "./BlogViewPostsListItemActions.module.css";

export default function BlogViewPostsListItemActions({
  incrementing,
  editing,
}) {
  const [addHeartIconClass, setAddHeartIconClass] = useState(false);

  const handleHeartIconClick = (e) => {
    e.stopPropagation();
    incrementing();
    setAddHeartIconClass((prev) => !prev);
  };

  const handleEditIconClick = (e) => {
    e.stopPropagation();
    editing();
  };

  return (
    <Fragment>
      <a href="#!" className="link-muted mx-1">
        <FaEdit onClick={handleEditIconClick} title="edit" size={12} />
      </a>
      <a href="#!" className={`link-muted mx-1 relative`}>
        {addHeartIconClass && <IncrementerTooltip>+1</IncrementerTooltip>}
        <FaHeart
          onClick={handleHeartIconClick}
          className={addHeartIconClass && classes.icon}
          title="like"
          size={12}
        />
      </a>
    </Fragment>
  );
}
