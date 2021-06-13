import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import axios from "axios";
import { getUserProfileIdURL } from "../../store/constants";

import Navigationbar from "./Navigationbar";
import Category from "./Category";

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

        <footer style={{ background: "black", marginTop: "50px" }}>
          <div className="row" style={{ width: "70%" }}>
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
                  Copyright © 2020 Company Name : <a href="">Sec2Hand</a>
                </p>
              </div>
            </div>
          </div>
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
