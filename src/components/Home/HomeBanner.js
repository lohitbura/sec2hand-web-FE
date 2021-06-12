import React from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Carousel } from "react-bootstrap";
import * as ImIcons from "react-icons/im";

export default function HomeBanner() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="text-content">
              <h4>
                <del></del>
                <strong className="text-primary"></strong>
              </h4>
              <h2></h2>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-8 col-sm-8 text-center searchM">
        <form className="d-flex searchBar searchHider">
          <input
            type="search"
            placeholder="Find Cars, Mobile, Bikes and Many More...... "
            //   onChange={this.onProductTypeChange}
            name="productType"
          />
          <button
            className="btn"
            type="submit"
            //   onClick={(e) => this.productFilterSubmit(e)}
          >
            <ImIcons.ImSearch className="icons" />
          </button>
        </form>
      </div>

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
