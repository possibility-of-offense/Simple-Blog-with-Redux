import BlogView from "./BlogView/BlogView";
import BlogForm from "./BlogForm/BlogForm";

export default function Blog() {
  return (
    <section className="blog container px-2">
      <div className="row gx-2">
        {/* Form for adding blogs */}
        <BlogForm columns="col-3" />

        {/* Panel for the blogs being added */}
        <BlogView columns="col-9" />
      </div>
    </section>
  );
}
