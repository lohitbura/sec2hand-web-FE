import React, { useEffect, useState } from "react";
import { blogDetailAPI } from "../../store/actions/blog";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

export default function BlogDetail() {
  const params = useParams();

  const [blog, setBlog] = useState({});

  useEffect(() => {
    blogDetailAPI(params.id).then((data) => {
      setBlog(data);
    });
  }, []);

  return (
    <div style={{ marginTop: 50 }}>
      <div className="container">
        <div>
          <div>
            <h1>{blog.title}</h1>
            <img
              style={{ width: "70%", height: "30%" }}
              src={`${blog.image && blog.image[0].image}`}
            />
            <div style={{ marginTop: 20, display: "block" }}>
              {ReactHtmlParser(blog.description)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
