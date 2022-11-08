import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { prepareEditPost } from "../../../../features/blog/blogSlice";
import TagsGroup from "../../../Tags/TagsGroup";
import SingleBlogViewDatesLikes from "./SingleBlogViewDates_Likes";

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
      <div className="row">
        <p className="label-text col-8">By {blog.author}</p>
        <div className="col-4">
          <TagsGroup tags={blog.tags} greenify={true} />
        </div>
      </div>
      <p>{blog.content}</p>
      <hr />
      <SingleBlogViewDatesLikes info={{ date: blog.date, likes: blog.likes }} />
    </div>
  );
}
