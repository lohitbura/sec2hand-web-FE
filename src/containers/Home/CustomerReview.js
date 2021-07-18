import React, { useEffect, useState } from "react";
import { customerReviewListAPI } from "../../store/actions/customerReview";
import "./style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default function CustomerReview() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    customerReviewListAPI().then((res) => {
      setData(res);
    });
  }, []);

  if (data.length == 0) {
    return null;
  }

  return (
    <div style={{ marginTop: 100 }}>
      <div className="container">
        <h3>Customer review</h3>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={false} // means to render carousel on server-side.
          keyBoardControl={true}
          containerClass="carousel-container"
          autoPlay
          autoPlaySpeed={3000}
          arrows={false}
          infinite
          // removeArrowOnDeviceType={["tablet",]}
        >
          {data.map((item) => {
            return (
              <div style={{ width: 345 }}>
                <div class="block-text rel zmin">
                  <a title="" href="#">
                    {item.review_title}
                  </a>
                  <div class="mark">
                    <div className={classes.root}>
                      <Rating
                        disabled
                        name="hover-feedback"
                        value={item.rating}
                        precision={item.rating}
                      />
                      {value !== null && (
                        <Box ml={2}>
                          {labels[hover !== -1 ? hover : item.rating]}
                        </Box>
                      )}
                    </div>
                  </div>
                  <p>{item.review_description}</p>
                  <ins class="ab zmin sprite sprite-i-triangle block"></ins>
                </div>
                <div class="person-text rel">
                  <img
                    style={{ width: 50 }}
                    src="https://www.striata.com/wp-content/uploads/2017/10/User-access-1-b-1.png"
                  />
                  <a>{item.customer_name}</a>
                  <i>from Glasgow, Scotland</i>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
