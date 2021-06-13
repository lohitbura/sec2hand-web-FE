import React from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Carousel } from "react-bootstrap";
import * as ImIcons from "react-icons/im";

export default function HomeBanner() {
  return (
    <div>
      <div className="main-container">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../../assets/images/slider1.png"
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}
