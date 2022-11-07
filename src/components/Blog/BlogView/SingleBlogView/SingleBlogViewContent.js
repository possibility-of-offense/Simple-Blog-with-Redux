import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { prepareEditPost } from "../../../../features/blog/blogSlice";
import SingleBlogViewDates_Likes from "./SingleBlogViewDates_Likes";

export default function SingleBlogViewContent({ blog }) {
  const dispatch = useDispatch();
  const handleEditing = () => {
    dispatch(
      prepareEditPost(blog.id, {
        id: blog.id,
        author: blog.author,
        title: blog.title,
        content: blog.content,
      })
    );
  };

  return (
    <div className="alert alert-light" role="alert">
      <h4 className="alert-heading">
        {blog.title} -
        <FaEdit
          className="cursor-pointer"
          onClick={handleEditing}
          title="edit"
          size={12}
        />
      </h4>
      <p className="label-text">By {blog.author}</p>
      <p>{blog.content}</p>
      <hr />
      <SingleBlogViewDates_Likes
        info={{ date: blog.date, likes: blog.likes }}
      />
    </div>
  );
}
