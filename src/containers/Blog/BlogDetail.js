import React, { useEffect, useState } from "react";
import { blogDetailAPI } from "../../store/actions/blog";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const params = useParams();

  const [blog, setBlog] = useState({});

  useEffect(() => {
    blogDetailAPI(params.id).then((data) => {
      setBlog(data);
    });
  }, []);

  return (
    <div style={{marginTop: 50}}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <h1>{blog.title}</h1>
            <img style={{width: "70%", height: "70%"}} src={`${blog.image && blog.image[0].image}`} />
            <p style={{marginTop: 20, fontSize: 15}}>
                {blog.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
