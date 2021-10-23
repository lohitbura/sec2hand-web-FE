import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Banner from "../../assets/images/banner.png";
import { createCustomerMessageAPI } from "../../store/actions/customerReview";

export default function AboutUs() {
  const [message, setMessage] = useState();

  const formSubmit = () => {
    createCustomerMessageAPI({ message: message }).then(() => {
      setMessage("");
    });
  };

  return (
    <div>
      <div>
        <a href="https://play.google.com/store/apps/details?id=com.lohitbura.sec2hand&hl=en&gl=US">
          <img style={{ width: "100%" }} src={Banner} />
        </a>
      </div>
      <div className="best-features about-features">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading text-center">
                <h2 id="about" style={{ color: "black", fontWeight: "600" }}>
                  ABOUT SEC2HAND
                </h2>
              </div>
            </div>

            <div className="col-md-12">
              <div className="left-content">
                <h4 style={{ color: "black" }}>About us</h4>
                <p>
                  Sec2hand is a leading e-commerce platform for second hand
                  products, which offers you the service to buy and sell second
                  hand products. The main purpose of this website is to make
                  your life more convenient. We are proud to introduce you all
                  kinds of used products.
                </p>
              </div>
              <br />
              <div className="left-content">
                <h4 style={{ color: "black" }}>Vision & Mission</h4>
                <p>
                  Our aim is to provide an easy way for users to get access to
                  the best brands by offering real reviews for each product. We
                  are here to make organized second hand market.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact">
        <div className="send-message">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-heading text-center">
                  <h2 id="about" style={{ color: "black", fontWeight: "600" }}>
                    Send us a Message
                  </h2>
                </div>
              </div>
              <div className="col-md-6">
                <div className="contact-form">
                  <form id="contact" action="" method="post">
                    <div className="row">
                      <div className="col-lg-12">
                        <fieldset>
                          <textarea
                            name="message"
                            rows="6"
                            className="form-control contactUs"
                            id="message"
                            placeholder="Your Message"
                            required=""
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12 text-center">
                        <fieldset>
                          <Button
                            size="small"
                            style={{ background: "#e6b05b", color: "white" }}
                            onClick={formSubmit}
                          >
                            Send message
                          </Button>
                        </fieldset>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div style={{ marginTop: -100 }} className="container col-md-6">
                <div className="best-features about-features">
                  <div className="container">
                    <div className="row justify-content-center">
                      {/* <div className="col-md-12">
                        <div className=" text-center">
                          <h2
                            // id="about"
                            style={{ color: "black", fontWeight: "600" }}
                          >
                            Keep in touch
                          </h2>
                        </div>
                      </div> */}

                      <div className="col-md-4 text-center">
                        <i
                          style={{ fontSize: 50, color: "black" }}
                          className="fa fa-phone"
                        ></i>
                        <h5>Contact - 7073264533, 7425054434</h5>
                      </div>
                      <div className="col-md-4 text-center">
                        <i
                          style={{ fontSize: 50, color: "black" }}
                          class="fa fa-envelope"
                        ></i>
                        <h5>support@sec2hand.com</h5>
                      </div>
                      <div className="col-md-4 text-center">
                        <i
                          style={{ fontSize: 50, color: "black" }}
                          class="fa fa-map-marker"
                        ></i>
                        <h5>
                          Startup cell, CS department, Near Ayyappa Temple,
                          Ratanada, Jodhpur (Raj.) - 342001
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
