import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardContainer from "../../components/Blog/Card";
import { fetchBlogAPI } from "../../store/actions/blog";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default function BlogList() {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    fetchBlogAPI().then((data) => {
      setBlogList(data);
    });
  }, []);

  if (blogList.length == 0) {
    return null;
  }

  return (
    <div style={{ marginTop: 100 }}>
      <div className="container">
        <h3>Recent Blogs</h3>

        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={false} // means to render carousel on server-side.
          keyBoardControl={true}
          containerClass="carousel-container"
          // removeArrowOnDeviceType={["tablet",]}
        >
          {blogList.map((item) => {
            return (
              <div>
                <Link to={`/blog/${item.id}`}>
                  <CardContainer data={item} />
                </Link>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
