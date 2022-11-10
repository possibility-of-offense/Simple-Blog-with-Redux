import { Fragment } from "react";
import { FaTimesCircle } from "react-icons/fa";

export default function CloseIcon(props) {
  return (
    <Fragment>
      {props.children}
      &nbsp;
      <span className="icon-box--light-bg" onClick={props.onClick}>
        <span className="inner-span">
          <FaTimesCircle
            className="cursor-pointer"
            title="remove filtering"
            size={12}
          />
        </span>
      </span>
    </Fragment>
  );
}
