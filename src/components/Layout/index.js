import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import axios from "axios";
import { getUserProfileIdURL } from "../../store/constants";

import Navigationbar from "./Navigationbar";
import Category from "./Category";
import { PRIMARY_COLOR } from "../../services/data";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";

class CustomLayout extends React.Component {
  state = {
    username: "",
    token: "",
    active: 1,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      let headers = {
        Authorization: `Token ${localStorage.getItem("token")}`,
      };
      axios.get(getUserProfileIdURL, { headers: headers }).then((res) => {
        this.setState({ username: res.data.user });
      });
    }
  }

  render() {
    const { authenticated } = this.props;
    const { username, active } = this.state;
    return (
      <div>
        <div id="preloader">
          <div className="jumper">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className="secondHeader">
          <Navigationbar />
          <Category />
        </div>

        {this.props.children}

        <footer style={{ backgroundColor: "#E6B05B", marginTop: "50px" }}>
          <div>
            <p
              style={{
                backgroundColor: "#5B1C03",
                color: "#E6B05B",
                fontSize: 26,
              }}
            >
              Follow us
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "1px 16px",
                height: 130,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <InstagramIcon
                  style={{ fontSize: 40, marginRight: 5, color: "#8a3ab9" }}
                />
                <YouTubeIcon
                  style={{ fontSize: 40, marginRight: 5, color: "#c4302b" }}
                />
                <FacebookIcon
                  style={{ fontSize: 40, marginRight: 5, color: "#3b5998" }}
                />
                <TwitterIcon
                  style={{ fontSize: 40, marginRight: 5, color: "#1DA1F2" }}
                />
                <LinkedInIcon
                  style={{ fontSize: 40, marginRight: 5, color: "#0e76a8" }}
                />
              </div>
              <div style={{ width: 400 }}>
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: "500",
                    color: "#5B1C03",
                    height: 14,
                    textAlign: "left",
                  }}
                >
                  Privacy policy
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#5B1C03",
                    height: 8,
                    textAlign: "left",
                  }}
                >
                  All rights reserved
                </p>
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: "500",
                    color: "#5B1C03",
                    height: 15,
                    textAlign: "left",
                  }}
                >
                  Copyright © 2021 SEC2HAND
                </p>
              </div>
            </div>
          </div>

          {/*    <div className="row">
            <div className="col-md-6" style={{ marginTop: 70 }}>
              <ul className="social-icons">
                <li>
                  <a href="https://www.facebook.com/Sec2Hand-360972987823797/">
                    <i
                      style={{ color: "white" }}
                      className="fa fa-facebook"
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/invites/contact/?i=14qq181cy3b1b&utm_content=eghzw47 ">
                    <i
                      style={{ color: "white" }}
                      className="fa fa-instagram"
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/c/Sec2hand">
                    <i style={{ color: "white" }} className="fa fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/sec2hand?s=08">
                    <i style={{ color: "white" }} className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/sec2hand-business-solutions-private-limited">
                    <i
                      style={{ color: "white" }}
                      className="fa fa-linkedin"
                    ></i>
                  </a>
                </li>
              </ul>
              <br />
              <a
                href="https://play.google.com/store/apps/details?id=com.lohitbura.sec2hand"
                title="Image from freepnglogos.com"
              >
                <img
                  src="../../assets/images/google-play.png"
                  width="200"
                  alt="get it on google play, google play badge png logos"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.lohitbura.sec2hand"
                title="Image from freepnglogos.com"
              >
                <img
                  src="../../assets/images/app-store.png"
                  width="200"
                  alt="get it on google play, google play badge png logos"
                />
              </a>
            </div>

            <div className="col-md-6">
              <div className="inner-content">
                <p>About our office</p>
                <p>
                  {" "}
                  Jodhpur <br />
                  Rajasthan
                  <br />
                  Email - support@sec2hand.com
                </p>
                <p>
                  <Link style={{ color: "white" }} to="/privacy">
                    Privacy policy
                  </Link>
                </p>
                <p style={{ color: "white" }}>
                  Copyright © 2020 Company Name : <a style={{color: PRIMARY_COLOR}}>Sec2Hand</a>
                </p>
              </div>
            </div>
          </div>
        */}
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.token !== null,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomLayout)
);
