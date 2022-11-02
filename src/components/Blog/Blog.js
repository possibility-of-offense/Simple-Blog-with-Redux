import BlogContent from "./BlogContent/BlogContent";
import BlogForm from "./BlogForm/BlogForm";

export default function Blog() {
  return (
    <section className="blog container px-2">
      <div className="row gx-2">
        <BlogForm columns="col-6" />
        <BlogContent columns="col-6" />
      </div>
    </section>
  );
}
