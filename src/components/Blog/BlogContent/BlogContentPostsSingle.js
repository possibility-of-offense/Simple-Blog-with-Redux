export default function BlogContentPostsSingle({ children, classes, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classes}
      aria-current="true"
    >
      {children}
    </button>
  );
}
