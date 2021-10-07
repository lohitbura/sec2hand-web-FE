import React from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Carousel } from "react-bootstrap";
import * as ImIcons from "react-icons/im";
import { Grid } from "@material-ui/core";
import Uncle from "../../assets/images/uncle1.png";
import background from "../../assets/images/background-top.png";
import { Link } from "react-router-dom";
export default function HomeBanner() {
  return (
    <div style={{ backgroundImage: `url(${background})`, height: "100vh" }}>
      <Grid container spacing={0}>
        <Grid lg={6} xs={12} item>
          <div style={{ padding: "14% 23%" }}>
            <p
              style={{
                fontSize: 50,
                color: "#5B1C03",
                fontWeight: "600",
                height: 18,
                width: 400,
              }}
            >
              SECOND HAND
            </p>
            <p
              style={{
                fontSize: 52,
                color: "#5B1C03",
                fontWeight: "400",
                height: 26,
              }}
            >
              {" "}
              मतलब
            </p>
            <p style={{ fontSize: 50, color: "#5B1C03", fontWeight: "600" }}>
              SEC2HAND
            </p>

            <button
              style={{
                padding: "6px 22px",
                backgroundColor: "#5B1C03",
                color: "#E6B05B",
                borderRadius: 20,
                fontSize: 20,
                border: "none",
                fontWeight: "bold",
              }}
            >
              BUY
            </button>

            <Link to="/product-create">
              <button
                style={{
                  padding: "6px 22px",
                  backgroundColor: "#5B1C03",
                  color: "#E6B05B",
                  borderRadius: 20,
                  fontSize: 20,
                  border: "none",
                  fontWeight: "bold",
                  marginLeft: 24,
                }}
              >
                SELL
              </button>
            </Link>
          </div>
        </Grid>

        <Grid lg={6} xs={12} item>
          <img src={Uncle} style={{ width: "100%", height: "100%" }} />
        </Grid>
      </Grid>

      {/*  <div className="main-container">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../../assets/images/slider1.png"
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
      </div> */}
    </div>
  );
}
//banner
