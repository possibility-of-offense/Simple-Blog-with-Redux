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
  const [showTagsList, setShowTagsList] = useState(false);

  useEffect(() => {
    if (selectPostsView === "all-posts" || selectPostsView === "tags") {
      if (!showList) {
        setShowList(true);
      }
    } else {
      setShowList(false);
    }
  }, [selectPostsView, showList]);

  const [blogId, setBlogId] = useState(null);
  const selectBlogById = useSelector((state) =>
    memoizeSelectById(state, blogId)
  );

  useEffect(() => {
    if (selectPostsView === "tags") {
      setShowList(true);
      setShowTagsList(true);
    }
  }, [selectPostsView]);

  return (
    <div className={columns}>
      <Panel>
        <BlogViewTabActions />

        {showList && !showTagsList && (
          <BlogViewPosts
            onToggleShowList={setShowList}
            onSetBlogId={setBlogId}
          />
        )}

        {showList && showTagsList && (
          <BlogViewPosts
            onToggleShowList={setShowList}
            onSetBlogId={setBlogId}
            toShowPostsWithTags={showTagsList}
          />
        )}
        {!showList && <SingleBlogViewContent blog={selectBlogById} />}
      </Panel>
    </div>
  );
}
