import React from "react";
import Button from "@material-ui/core/Button";
export default function AboutUs() {
  return (
    <div>
      <div className="best-features about-features">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading text-center">
                <h2 id="about" style={{ color: "grey", fontWeight: "600" }}>
                  ABOUT SEC2HAND
                </h2>
              </div>
            </div>

            <div className="col-md-12">
              <div className="left-content">
                <h4>About us</h4>
                <p>
                  Sec2hand is a leading e-commerce platform for
                  second hand products,
                  which offers you the service to buy and sell second hand products.
                  The main purpose of this website is to make your life more convenient.
                  We are proud to introduce you all kinds of used products.
                </p>
              </div>
              <br />
              <div className="left-content">
                <h4>Vision & Mission</h4>
                <p>
                Our aim is to provide an easy way for users to get access to the best brands by 
                offering real reviews for each product.
                 We are here to make organized second hand market.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="best-features about-features">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="section-heading text-center">
                <h2 id="about" style={{ color: "grey", fontWeight: "600" }}>
                  Keep in touch
                </h2>
              </div>
            </div>

            <div className="col-md-4 text-center">
              <i
                style={{ fontSize: 50, color: "#e6b05b" }}
                className="fa fa-phone"
              ></i>
              <h5>Contact - 7073264533, 7425054434</h5>
            </div>
            <div className="col-md-4 text-center">
              <i
                style={{ fontSize: 50, color: "#e6b05b" }}
                class="fa fa-envelope"
              ></i>
              <h5>support@sec2hand.com</h5>
            </div>
            <div className="col-md-4 text-center">
              <i
                style={{ fontSize: 50, color: "#e6b05b" }}
                class="fa fa-map-marker"
              ></i>
              <h5>
                Startup cell, CS department, Near Ayyappa Temple, Ratanada,
                Jodhpur (Raj.) - 342001
              </h5>
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
                  <h2>Send us a Message</h2>
                </div>
              </div>
              <div className="col-md-6">
                <div className="contact-form">
                  <form id="contact" action="" method="post">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 ">
                        <fieldset>
                          <input
                            name="name"
                            type="text"
                            className="form-control contactUs"
                            id="name"
                            placeholder="Full Name"
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <fieldset>
                          <input
                            name="email"
                            type="text"
                            className="form-control contactUs"
                            id="email"
                            placeholder="E-Mail Address"
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <fieldset>
                          <input
                            name="subject"
                            type="text"
                            className="form-control contactUs"
                            id="subject"
                            placeholder="Subject"
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <textarea
                            name="message"
                            rows="6"
                            className="form-control contactUs"
                            id="message"
                            placeholder="Your Message"
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12 text-center">
                        <fieldset>
                          <Button size="small" color="primary">
                            Send message
                          </Button>
                        </fieldset>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="container col-md-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.7002531017847!2d73.03288331503141!3d26.27139008340809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDE2JzE3LjAiTiA3M8KwMDInMDYuMyJF!5e0!3m2!1sen!2sin!4v1618844168824!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
