import { nanoid } from "@reduxjs/toolkit";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actualEditPost,
  addBlog,
  selectBlogById,
  selectEditedPost,
} from "../../../features/blog/blogSlice";
import resetInputVals from "../../../helpers/reset-input-values";
import moment from "moment";

import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Panel from "../../UI/Panel";
import Alert from "../../UI/Alert";

const postAddedReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        alertContent: action.payload,
        showAlert: true,
      };

    case "HIDE_ALERT":
      return {
        alertContent: "",
        showAlert: false,
      };
    default:
      return state;
  }
};

export default function BlogForm({ columns }) {
  const [author, setAuthor] = useState("Ventsislav Iliev");
  const [title, setTitle] = useState("How to blah blah in React!");
  const [content, setContent] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci perspiciatis ad odio, recusandae cum, laborum animi molestiae minus totam neque quod tempora velit ipsum ipsam fugit quae necessitatibus sed? Dolorem iusto odit reprehenderit minus totam. Error dignissimos sint magnam tempore quas. Asperiores, autem. Necessitatibus enim minima id quis eos harum quaerat assumenda repudiandae aperiam repellat nulla illo quae ad, odio eligendi temporibus et quo laudantium atque veniam cupiditate! A provident, consequatur laudantium harum at non iste assumenda aliquam beatae optio asperiores doloribus? Accusantium excepturi eos aut earum, necessitatibus facere nemo natus quo placeat quisquam alias porro a fugiat quam ratione."
  );

  const [blogId, setBlogId] = useState(null);

  const firstInputRef = useRef(null);

  // check for post being in edit mode
  const selectBeingEdit = useSelector(selectEditedPost);
  const selectBlog = useSelector((state) => selectBlogById(state, blogId));

  // if is in edit mode, update the blog id; when the blog id is updated, the component
  // is being re-rendered so the selectBlog selector will catch the right blog
  // When re-render updated the input fields

  const [postAddedState, postAddedDispatcher] = useReducer(postAddedReducer, {
    showAlert: false,
    alertContent: "",
  });

  useEffect(() => {
    if (selectBeingEdit.type === "edited") {
      setBlogId(selectBeingEdit.id);
      if (selectBlog) {
        setAuthor(selectBlog.author);
        setTitle(selectBlog.title);
        setContent(selectBlog.content);
      }
    } else if (selectBeingEdit.type === "left-editing") {
      resetInputVals(
        { value: setAuthor, type: "" },
        { value: setTitle, type: "" },
        { value: setContent, type: "" }
      );
      firstInputRef.current.focus();
    }
  }, [selectBeingEdit.type, selectBeingEdit.id, selectBlog]);

  const dispatch = useDispatch();

  const handleAddBlog = useCallback(
    (e) => {
      e.preventDefault();

      const blog = {
        id: nanoid(),
        author,
        title,
        content,
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
        likes: 0,
      };

      // Dispatch only if not in edited mode
      if (selectBeingEdit?.type !== "edited") {
        dispatch(addBlog(blog));
      } else {
        // Actual update on the post
        dispatch(
          actualEditPost(selectBeingEdit.id, {
            id: selectBeingEdit.id,
            author,
            title,
            content,
            date: moment().format("MMMM Do YYYY, h:mm:ss a"),
            likes: selectBlog.likes,
          })
        );
      }

      resetInputVals(
        { value: setAuthor, type: "" },
        { value: setTitle, type: "" },
        { value: setContent, type: "" }
      );
      firstInputRef.current.focus();

      postAddedDispatcher({ type: "SHOW_ALERT", payload: "Post Added" });
    },
    [author, title, content, dispatch, selectBeingEdit.id, selectBeingEdit.type]
  );

  const handleHideAlert = () => {
    postAddedDispatcher({ type: "HIDE_ALERT" });
  };

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
            {/* TODO add props forwarding */}
            <Input
              ref={firstInputRef}
              id="blogAuthor"
              labelClasses="form-label label-text text-primary"
              labelContent="Author"
              inputType="text"
              inputClasses="form-control"
              inputPlaceholder="Your name..."
              value={author}
              onSetValue={setAuthor}
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
              value={title}
              onSetValue={setTitle}
            />
          </div>
          <div className="mb-3">
            <Input
              id="blogContent"
              labelClasses="form-label label-text text-primary"
              labelContent=" Content of the blog"
              inputType="textarea"
              inputClasses="form-control"
              value={content}
              onSetValue={setContent}
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
