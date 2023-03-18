import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../reducers";
import BlogComments from "./BlogComments";
import "../styling/blogs.css";
import { Input } from "@material-ui/core";

const Blogs = () => {
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [showComment, setShowComment] = useState("");
  const[inputvalue,setInputValue]=useState("");

  const handleViewCommnets = (id) => {
    
    setShowComment(id);

  };

  const searchInput = useSelector(selectUserInput);
  console.log("Going to fetch API");
  // const blog_url =fetch('https://jsonplaceholder.typicode.com/todos/1')
  // .then(response => response.json())
  // .then(json => {
  // })
  console.log(".........",inputvalue);
  const dispatch = useDispatch();
  const [lstBlogs, setBlogs] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log("Data:", response.data);
        dispatch(setBlogData(response.data));
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput]);
  console.log("Test");

  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Blogs</h1>
      {loading ? <h1 className="loading">Loading...</h1> : ""}
      <div className="blogs">
        {lstBlogs?.map((blogObj) => (
          <a
            className="blog"
            target="_blank"
            href={blogObj?.url}
            rel="noopener noreferrer"
            key={blogObj.id}
          >
            <div>
              <h3 className="sourceName">
                <span>{blogObj?.title}</span>
                <p>{blogObj?.publishedAt}</p>
              </h3>
              <p>{blogObj?.body}</p>
              <div
                className="commentCls"
                id={blogObj?.id}
                onClick={() => handleViewCommnets(blogObj?.id)}
              >
                💬
              </div>

              <div>
                {" "}
                {selectedBlogId == blogObj?.id && (
                  <BlogComments data={selectedBlogId} />
                )}{" "}
              </div>
              {showComment === blogObj?.id && (
                <lable>
                  Comment <Input onChange={(e)=>setInputValue(e.target.value)}></Input>{" "}
                </lable>
              )}
            </div>
          </a>
        ))}

        {lstBlogs?.length === 0 && (
          <h1 className="no__blogs">Invalid search!</h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
