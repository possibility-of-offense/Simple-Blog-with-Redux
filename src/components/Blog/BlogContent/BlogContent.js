import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBlogById as memoizeSelectById } from "../../../features/blog/blogSlice";
import Panel from "../../UI/Panel";
import BlogContentActions from "./BlogContentActions";
import BlogContentPosts from "./BlogContentPosts";
import SingleBlogPostContent from "./SingleBlogPostContent";

export default function BlogContent({ columns }) {
  const selectPostsView = useSelector((state) => state.blog.postsView);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    if (selectPostsView === "all-posts") {
      setShowList(true);
    } else {
      setShowList(false);
    }
  }, [selectPostsView]);

  const [blogId, setBlogId] = useState(null);
  const selectBlogById = useSelector((state) =>
    memoizeSelectById(state, blogId)
  );

  return (
    <div className={columns}>
      <Panel>
        <BlogContentActions />
        {showList && (
          <BlogContentPosts
            onToggleShowList={setShowList}
            onSetBlogId={setBlogId}
          />
        )}
        {!showList && <SingleBlogPostContent blog={selectBlogById} />}
      </Panel>
    </div>
  );
}
