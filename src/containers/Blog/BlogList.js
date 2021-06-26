import React, { useEffect, useState } from "react";
import CardContainer from "../../components/Blog/Card";
import { fetchBlogAPI } from "../../store/actions/blog";

export default function BlogList() {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    fetchBlogAPI().then((data) => {
      setBlogList(data);
    });
  }, []);

  return (
    <div style={{ marginTop: 100 }}>
      <div className="container">
        <h2>Recent Blogs</h2>

        <div className="row">
          {blogList.map((item) => {
            return (
              <div className="col-md-4 col-sm-6">
                <CardContainer data={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
