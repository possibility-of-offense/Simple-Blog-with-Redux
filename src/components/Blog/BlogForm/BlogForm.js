import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import resetInputVals from "../../../helpers/reset-input-values";

import {
  actualEditPost,
  addBlog,
  selectPostById,
  selectEditedPost,
} from "../../../features/blog/blogSlice";
import { addTags, selector, mergeTags } from "../../../features/tags/tagsSlice";

import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Panel from "../../UI/Panel";
import Alert from "../../UI/Alert";
import postAddedReducer from "../../../reducers/post-added";
import MultiSelectInput from "../../UI/MultiSelectInput";
import TagsGroup from "../../Tags/TagsGroup";
import { store } from "../../../app/store";

const initialState = {
  alertContent: "",
  showAlert: false,
  author: "",
  title: "",
  content: "",
  tags: [],
};

export default function BlogForm({ columns }) {
  const [postAddedState, postAddedDispatcher] = useReducer(
    postAddedReducer,
    initialState
  );

  // Set blog id
  const [blogId, setBlogId] = useState(null);

  // Ref for the first input
  const firstInputRef = useRef(null);

  const dispatch = useDispatch();

  // check for post being in edit mode
  const selectBeingEdit = useSelector(selectEditedPost);
  const selectBlog = useSelector((state) => selectPostById(state, blogId));

  // if is in edit mode, update the blog id; when the blog id is updated, the component
  // is being re-rendered so the selectBlog selector will catch the right blog
  // When re-render updated the input fields

  useEffect(() => {
    if (selectBeingEdit.type === "edited") {
      setBlogId(selectBeingEdit.id);
      if (selectBlog) {
        postAddedDispatcher({ type: "SET_AUTHOR", payload: selectBlog.author });
        postAddedDispatcher({ type: "SET_TITLE", payload: selectBlog.title });
        postAddedDispatcher({
          type: "SET_CONTENT",
          payload: selectBlog.content,
        });
        postAddedDispatcher({
          type: "SET_TAGS",
          payload: selectBlog.tags,
        });
      }
    } else if (selectBeingEdit.type === "left-editing") {
      resetInputVals(
        {
          value: postAddedDispatcher({ type: "SET_AUTHOR", payload: "" }),
          type: "",
        },
        {
          value: postAddedDispatcher({ type: "SET_TITLE", payload: "" }),
          type: "",
        },
        {
          value: postAddedDispatcher({ type: "SET_CONTENT", payload: "" }),
          type: "",
        },
        {
          value: postAddedDispatcher({ type: "SET_TAGS", payload: [] }),
          type: "",
        }
      );
      firstInputRef.current.focus();
    }
  }, [selectBeingEdit.type, selectBeingEdit.id, selectBlog]);

  // useEffect for checking updates on the inputs and then clear the tags

  useEffect(() => {
    setToClearTags(false);
  }, [postAddedState]);

  // Adding blog post

  const [toClearTags, setToClearTags] = useState(false);
  const [cachedTagsContent, setCachedTagsContent] = useState("");
  const handleAddBlog = useCallback(
    (e) => {
      e.preventDefault();

      const blog = {
        id: nanoid(),
        author: postAddedState.author,
        title: postAddedState.title,
        content: postAddedState.content,
        tags: postAddedState.tags,
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
        likes: 0,
      };

      // Dispatch only if not in edited mode
      const splitCachedTags = cachedTagsContent.split(/,\s*/);
      let tags;
      let areEqual = true;

      for (let i = 0; i < splitCachedTags.length; i++) {
        if (splitCachedTags[i] === postAddedState.tags[i]) {
          continue;
        } else {
          areEqual = false;
          break;
        }
      }

      if (!areEqual) {
        tags = splitCachedTags;
      } else {
        tags = postAddedState.tags;
      }

      if (selectBeingEdit?.type !== "edited") {
        const entities = selector.selectEntities(store.getState().tags);
        let mergedEntities = {};

        // LOGIC for merging the blog ids for the tag
        if (Object.keys(entities).length > 0) {
          mergedEntities = { ...entities };
          for (let tag of tags) {
            if (mergedEntities.hasOwnProperty(tag)) {
              mergedEntities[tag] = {
                ...mergedEntities[tag],
                blog: mergedEntities[tag].blog.concat(blog.id),
              };
            } else {
              mergedEntities[tag] = {
                tag,
                blog: [blog.id],
              };
            }
          }
        } else {
          for (let tag of tags) {
            mergedEntities[tag] = {
              tag,
              blog: [blog.id],
            };
          }
        }

        dispatch(addTags(mergedEntities));

        blog.tags = tags;

        dispatch(addBlog(blog));
      } else {
        const splitCachedTags = cachedTagsContent.split(/,\s*/);
        let tags;
        let areEqual = true;

        for (let i = 0; i < splitCachedTags.length; i++) {
          if (splitCachedTags[i] === postAddedState.tags[i]) {
            continue;
          } else {
            areEqual = false;
            break;
          }
        }

        if (!areEqual) {
          tags = splitCachedTags;
        } else {
          tags = postAddedState.tags;
        }
        // Actual update on the post
        const post = {
          id: selectBeingEdit.id,
          author: postAddedState.author,
          title: postAddedState.title,
          content: postAddedState.content,
          tags: tags,
          date: moment().format("MMMM Do YYYY, h:mm:ss a"),
          likes: selectBlog.likes,
        };

        dispatch(actualEditPost(selectBeingEdit.id, post));

        dispatch(
          mergeTags(
            tags.map((el) => {
              return {
                tag: el,
                blog: blog.id,
              };
            })
          )
        );
      }

      setToClearTags(true);
      resetInputVals(
        {
          value: postAddedDispatcher,
          type: "SET_AUTHOR",
          reducer: "post-added",
        },
        {
          value: postAddedDispatcher,
          type: "SET_TITLE",
          reducer: "post-added",
        },
        {
          value: postAddedDispatcher,
          type: "SET_CONTENT",
          reducer: "post-added",
        },
        {
          value: postAddedDispatcher,
          type: "SET_TAGS",
          reducer: "post-added",
        }
      );
      firstInputRef.current.focus();

      postAddedDispatcher({ type: "SHOW_ALERT", payload: "Post Added" });
    },
    [
      postAddedState.author,
      postAddedState.title,
      postAddedState.content,
      postAddedState.tags,
      dispatch,
      selectBeingEdit.id,
      selectBeingEdit.type,
      selectBlog,
      cachedTagsContent,
    ]
  );

  // Hide the alert
  const handleHideAlert = () => {
    postAddedDispatcher({ type: "HIDE_ALERT" });
  };

  // Handle input change - pass prop callback to child components
  function handleInputChange(type, val) {
    switch (type) {
      case "author":
        postAddedDispatcher({ type: "SET_AUTHOR", payload: val });
        break;
      case "title":
        postAddedDispatcher({ type: "SET_TITLE", payload: val });
        break;
      case "content":
        postAddedDispatcher({ type: "SET_CONTENT", payload: val });
        break;
      case "tags":
        postAddedDispatcher({ type: "SET_TAGS", payload: val });
        break;

      default:
        break;
    }
  }

  return (
    <div className={columns}>
      {postAddedState.showAlert && (
        <Alert onHideAlert={handleHideAlert}>
          {postAddedState.alertContent}
        </Alert>
      )}
      <Panel>
        <form onSubmit={handleAddBlog}>
          <div className="mb-3">
            <Input
              ref={firstInputRef}
              id="blogAuthor"
              labelClasses="form-label label-text text-primary"
              labelContent="Author"
              inputType="text"
              inputClasses="form-control"
              inputPlaceholder="Your name..."
              value={postAddedState.author}
              onSetValue={handleInputChange.bind(null, "author")}
            />
          </div>
          <div className="mb-3">
            <Input
              id="blogTitle"
              labelClasses="form-label label-text text-primary"
              labelContent="Blog title"
              inputType="text"
              inputClasses="form-control"
              inputPlaceholder="Add title..."
              value={postAddedState.title}
              onSetValue={handleInputChange.bind(null, "title")}
            />
          </div>
          <div className="mb-3">
            <Input
              id="blogContent"
              labelClasses="form-label label-text text-primary"
              labelContent="Content of the blog"
              inputType="textarea"
              inputClasses="form-control"
              value={postAddedState.content}
              onSetValue={handleInputChange.bind(null, "content")}
            />
          </div>
          <div className="mb-3">
            <MultiSelectInput
              onAddTags={() => ({
                type: "SET_TAGS",
                cb: postAddedDispatcher,
              })}
              toClearTags={toClearTags}
              onSetCachedTagsContent={setCachedTagsContent}
              isEdited={selectBeingEdit}
              tags={postAddedState.tags}
            />
            <TagsGroup tags={postAddedState.tags} />
          </div>
          <div className="text-end">
            <Button classes="btn btn-primary">
              {selectBeingEdit.type !== "edited" ? "Add post" : "Edit post"}
            </Button>
          </div>
        </form>
      </Panel>
    </div>
  );
}
