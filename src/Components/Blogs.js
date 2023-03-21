import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../reducers";
import BlogComments from "./BlogComments";
import "../styling/blogs.css";
import { Input } from "@material-ui/core";
import Stack from '@mui/material/Stack';  
import Button from '@mui/material/Button';  
let commentCounter = 1;

const Blogs = () => {
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [showComment, setShowComment] = useState("");
  const[inputCmtVal,setInputCmtVal]=useState("");

  const handleViewCommnets = (id) => {
    clearCommentInput();
    setShowComment(id);
    

  };
  const clearCommentInput = () => {
    
    setInputCmtVal("");
  }
  const addComment = () =>{
    axios
      .post("https://jsonplaceholder.typicode.com/posts/1/comments", [
          {
            "postId": inputCmtVal.id,
            "id": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.biz",
            "body": inputCmtVal.comment     
          },
         ])
      .then((response) => {
        console.log("Data:", response.data); 
      })
      .catch((error) => {
        console.log(error);
      });
      
  }

  const searchInput = useSelector(selectUserInput);
  console.log("Going to fetch API");
  // const blog_url =fetch('https://jsonplaceholder.typicode.com/todos/1')
  // .then(response => response.json())
  // .then(json => {
  // })
  console.log(".........",inputCmtVal);
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
                onClick={() =>{ handleViewCommnets(blogObj?.id)}}
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
                <div>
                <lable>
                  Comment <Input value={inputCmtVal.comment} onChange={(e)=>setInputCmtVal({id:blogObj?.id,comment:e.target.value})}></Input>
                </lable>
                <Button variant="contained" onClick={addComment} >Post</Button>  
                <Button variant="outlined" onClick={clearCommentInput}>Clear</Button>  
                </div>
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
