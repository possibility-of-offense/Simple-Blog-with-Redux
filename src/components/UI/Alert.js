import classes from "./Alert.module.css";
import { FaWindowClose } from "react-icons/fa";

export default function Alert({ children, onClick }) {
  return (
    <div
      className={`alert alert-success text-center ${classes.alert}`}
      role="alert"
    >
      {children} &nbsp;
      <FaWindowClose className="cursor-pointer" onClick={onClick} />
    </div>
  );
}
