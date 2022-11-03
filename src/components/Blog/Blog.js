import BlogContent from "./BlogContent/BlogContent";
import BlogForm from "./BlogForm/BlogForm";

export default function Blog() {
  return (
    <section className="blog container px-2">
      <div className="row gx-2">
        <BlogForm columns="col-3" />
        <BlogContent columns="col-9" />
      </div>
    </section>
  );
}
