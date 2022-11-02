import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Blog from "./components/Blog/Blog";
import { useSelector, shallowEqual } from "react-redux";

function App() {
  const selectNumberOfPosts = useSelector(
    (state) => state.blog.numberOfPosts,
    shallowEqual
  );

  return (
    <div className="App">
      <header className="App-header bg-primary text-center text-white shadow-sm">
        <h1>Blog</h1>
        <p className="label-text">Number of posts - {selectNumberOfPosts}</p>
      </header>
      <br />
      <Blog />
    </div>
  );
}

export default App;
