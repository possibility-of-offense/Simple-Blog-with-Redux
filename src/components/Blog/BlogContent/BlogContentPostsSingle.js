export default function BlogContentPostsSingle({ children, classes, onClick }) {
  return (
    <div className={classes} aria-current="true">
      {children}
    </div>
  );
}
