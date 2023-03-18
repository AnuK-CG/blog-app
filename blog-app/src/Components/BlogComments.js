import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


const BlogComments = (selectedBlogId) => {
  return (
    <div>{selectedBlogId.data}</div>
  )
}

export default BlogComments