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

import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Panel from "../../UI/Panel";
import Alert from "../../UI/Alert";
import postAddedReducer from "../../../reducers/post-added";
import { addTag } from "../../../features/tags/tagsSlice";

const initialState = {
  alertContent: "",
  showAlert: false,
  author: "Ventsislav Iliev",
  title: "How to create content in React!",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci perspiciatis ad odio, recusandae cum, laborum animi molestiae minus totam neque quod tempora velit ipsum ipsam fugit quae necessitatibus sed? Dolorem iusto odit reprehenderit minus totam. Error dignissimos sint magnam tempore quas. Asperiores, autem. Necessitatibus enim minima id quis eos harum quaerat assumenda repudiandae aperiam repellat nulla illo quae ad, odio eligendi temporibus et quo laudantium atque veniam cupiditate! A provident, consequatur laudantium harum at non iste assumenda aliquam beatae optio asperiores doloribus? Accusantium excepturi eos aut earum, necessitatibus facere nemo natus quo placeat quisquam alias porro a fugiat quam ratione.",
  // TODO add tags array
  tags: "react",
};

export default function BlogForm({ columns }) {
  const [postAddedState, postAddedDispatcher] = useReducer(
    postAddedReducer,
    initialState
  );

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
          value: postAddedDispatcher({ type: "SET_TAGS", payload: "" }),
          type: "",
        }
      );
      firstInputRef.current.focus();
    }
  }, [selectBeingEdit.type, selectBeingEdit.id, selectBlog]);

  // Adding blog post
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
      if (selectBeingEdit?.type !== "edited") {
        const tagId = nanoid();
        dispatch(
          addTag({ id: tagId, tag: postAddedState.tags, blog: blog.id })
        );

        dispatch(addBlog(blog));
      } else {
        // Actual update on the post
        dispatch(
          actualEditPost(selectBeingEdit.id, {
            id: selectBeingEdit.id,
            author: postAddedState.author,
            title: postAddedState.title,
            content: postAddedState.content,
            tags: postAddedState.tags,
            date: moment().format("MMMM Do YYYY, h:mm:ss a"),
            likes: selectBlog.likes,
          })
        );
      }

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
      selectBlog.likes,
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
            <Input
              id="blogTags"
              labelClasses="form-label label-text text-primary"
              labelContent="Add some tags"
              inputType="text"
              inputClasses="form-control"
              value={postAddedState.tags}
              onClick={handleInputChange.bind(null, "tags")}
            />
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
