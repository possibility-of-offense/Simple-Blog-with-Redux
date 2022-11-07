import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPostById as memoizeSelectById } from "../../../features/blog/blogSlice";

import Panel from "../../UI/Panel";
import BlogViewTabActions from "./BlogViewTabActions";
import BlogViewPosts from "./BlogViewPosts";
import SingleBlogViewContent from "./SingleBlogView/SingleBlogViewContent";

export default function BlogView({ columns }) {
  // Get the posts view
  const selectPostsView = useSelector((state) => state.blog.postsView);

  // Use state to trigger different components based on the posts view
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    if (selectPostsView === "all-posts") {
      if (!showList) {
        setShowList(true);
      }
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
        <BlogViewTabActions />

        {showList && (
          <BlogViewPosts
            onToggleShowList={setShowList}
            onSetBlogId={setBlogId}
          />
        )}
        {!showList && <SingleBlogViewContent blog={selectBlogById} />}
      </Panel>
    </div>
  );
}
