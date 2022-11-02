import { nanoid } from "@reduxjs/toolkit";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../../../features/blog/blogSlice";
import resetInputVals from "../../../helpers/reset-input-values";
import moment from "moment";

import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Panel from "../../UI/Panel";

export default function BlogForm({ columns }) {
  const [author, setAuthor] = useState("Ventsislav Iliev");
  const [title, setTitle] = useState("How to blah blah in React!");
  const [content, setContent] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci perspiciatis ad odio, recusandae cum, laborum animi molestiae minus totam neque quod tempora velit ipsum ipsam fugit quae necessitatibus sed? Dolorem iusto odit reprehenderit minus totam. Error dignissimos sint magnam tempore quas. Asperiores, autem. Necessitatibus enim minima id quis eos harum quaerat assumenda repudiandae aperiam repellat nulla illo quae ad, odio eligendi temporibus et quo laudantium atque veniam cupiditate! A provident, consequatur laudantium harum at non iste assumenda aliquam beatae optio asperiores doloribus? Accusantium excepturi eos aut earum, necessitatibus facere nemo natus quo placeat quisquam alias porro a fugiat quam ratione."
  );

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
      };

      dispatch(addBlog(blog));

      resetInputVals(
        { value: setAuthor, type: "" },
        { value: setTitle, type: "" },
        { value: setContent, type: "" }
      );
      // TODO add alert
      console.log("POST ADDED");
    },
    [author, title, content]
  );

  return (
    <div className={columns}>
      <Panel>
        <form onSubmit={handleAddBlog}>
          <div className="mb-3">
            {/* TODO add props forwarding */}
            <Input
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
            <Button classes="btn btn-primary">Add post</Button>
          </div>
        </form>
      </Panel>
    </div>
  );
}
