import classes from "./Alert.module.css";
import { FaWindowClose } from "react-icons/fa";
import { useEffect } from "react";

export default function Alert({ children, onHideAlert }) {
  useEffect(() => {
    let timer = setTimeout(() => {
      onHideAlert();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [onHideAlert]);

  return (
    <div
      className={`alert alert-success text-center ${classes.alert}`}
      role="alert"
    >
      {children} &nbsp;
      <FaWindowClose className="cursor-pointer" onClick={onHideAlert} />
    </div>
  );
}
