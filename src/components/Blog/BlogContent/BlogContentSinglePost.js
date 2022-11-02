export default function BlogContentSinglePost({ blog }) {
  return (
    <div className="alert alert-light" role="alert">
      <h4 className="alert-heading">{blog.title}</h4>
      <p>{blog.content}</p>
      <hr />
      <p className="mb-0">{blog.date}</p>
      Likes: {blog.likes}
    </div>
  );
}
