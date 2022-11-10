import { Fragment } from "react";
import { FaTimesCircle } from "react-icons/fa";

import classes from "./CloseIcon.module.css";

export default function CloseIcon(props) {
  return (
    <Fragment>
      {props.children}
      &nbsp;
      <span className={classes["icon-box--light-bg"]}>
        <span className={classes["inner-span"]}>
          <FaTimesCircle
            className="cursor-pointer"
            onClick={props.onClick}
            title="remove filtering"
            size={12}
          />
        </span>
      </span>
    </Fragment>
  );
}
