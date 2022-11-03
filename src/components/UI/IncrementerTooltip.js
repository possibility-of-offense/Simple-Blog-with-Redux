import classes from "./IncrementerTooltip.module.css";

export default function IncrementerTooltip({ children }) {
  return <span className={classes.incrementer}>{children}</span>;
}
