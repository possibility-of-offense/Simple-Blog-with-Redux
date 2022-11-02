export default function Panel({ children, classes }) {
  let derClasses = classes ? " " + classes : "";
  return <div className={`card shadow-sm${derClasses} p-2`}>{children}</div>;
}
