import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import axios from "axios";
import { getUserProfileIdURL } from "../../store/constants";
import "./nav.css/nav.css";
import Button from "@material-ui/core/Button";
import { Modal } from "react-bootstrap";
import CityFilter from "./CityFilter";
import Sec2hand from "../../assets/images/sec2handlogo.png";
import background from "../../assets/images/background-top.png";
import Search from "./Search";
import { header } from "../../store/utility";

class Navigationbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleContainer = React.createRef();
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);

    this.showSidebar = this.showSidebar.bind(this);
    this.handleShow = this.handleShow.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    // this.useStyles=this.useStyles.bind(this);

    this.state = {
      sidebar: false,
      activemenu: 1,
      showModals: false,
    };
  }

  state = {
    username: "",
    token: "",
  };

  componentDidMount() {
    window.addEventListener("click", this.onClickOutsideHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.onClickOutsideHandler);
  }

  onClickOutsideHandler(e) {
    if (
      this.state.sidebar &&
      !this.toggleContainer.current.contains(e.target)
    ) {
      this.setState({ sidebar: false });
    }
  }

  showSidebar() {
    this.setState((currentState) => ({
      sidebar: !currentState.sidebar,
    }));
  }

  handleShow() {
    this.setState((currentState) => ({
      showModals: !currentState.showModals,
    }));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.token !== this.props.token) {
      axios.get(getUserProfileIdURL, header()).then((res) => {
        this.setState({ username: res.data.user });
      });
    }
  }

  render() {
    const { authenticated } = this.props;
    const { username, activemenu, showModals } = this.state;

    return (
      <div>
        <Modal show={showModals} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Login Yourself as</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 text-center">
                <Link
                  className="dropdown-item hidden"
                  to="/login"
                  onClick={this.handleClose}
                >
                  <div className="dealer"> CUSTOMER </div>
                  <div>
                    {" "}
                    <img
                      src="../../assets/images/customer1.png"
                      style={{
                        width: "150px",
                        height: "150px",
                        marginBottom: "20px",
                      }}
                    />
                  </div>
                </Link>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 text-center">
                <Link
                  className="dropdown-item hidden"
                  to="/dealer-login"
                  onClick={this.handleShow}
                >
                  <div className="dealer"> Dealer </div>
                  <div>
                    {" "}
                    <img
                      src="../../assets/images/carDealer1.png"
                      style={{
                        width: "150px",
                        height: "150px",
                        marginBottom: "20px",
                      }}
                    />
                  </div>
                </Link>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <div
          style={{ backgroundImage: `url(${background})` }}
          className="navBar"
          ref={this.toggleContainer}
        >
          <div className="logoimgNav">
            <Link to="/">
              <img
                style={{
                  maxWidth: "230px",
                }}
                src={Sec2hand}
                alt=""
              />
            </Link>
          </div>

          {/* search */}
          <div className="searchHide">
            <CityFilter />
          </div>
          <div className="searchHide">
            <Search />
          </div>
          {authenticated ? (
            <div style={{ marginRight: -40 }} className="hidden" type="button">
              <a className="hidden">
                <Link
                  to={`/profile`}
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                >
                  <Button varient="outlined">PROFILE</Button>
                </Link>
              </a>
            </div>
          ) : null}

          <div style={{ marginRight: -40 }} className="hidden">
            <a className="hidden">
              <Link to="/donate">
                <Button>DONATE</Button>
              </Link>
            </a>
          </div>
          {/* search end */}
          <div>
            {authenticated ? (
              <div
                style={{ marginRight: -20 }}
                className="hidden"
                type="button"
              >
                <a className="hidden">
                  <Link
                    to=""
                    style={{ cursor: "pointer" }}
                    className="nav-link"
                    onClick={() => this.props.logout()}
                  >
                    <Button varient="outlined">LOGOUT</Button>
                  </Link>
                </a>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: -20 }} className="hidden">
                  <a className="hidden">
                    {/* <Link to="/login"> */}
                    <Button onClick={this.handleShow} varient="outlined">
                      LOGIN
                    </Button>
                    {/* </Link> */}
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="hidden">
            <a className="hidden">
              <Link to="/product-create">
                <Button varient="outlined" style={{ backgroundColor: "#fff" }}>
                  SELL
                </Button>
              </Link>
            </a>
          </div>

          <div>
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={this.showSidebar} />
            </Link>
          </div>
        </div>

        <nav className={this.state.sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navBar-toggle">
              <Link to="#" className="closebtn" onClick={this.showSidebar}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {/* **********************************Navbar menu list end here********************************************** */}
            <li
              onClick={() => this.setState({ activemenu: 1 })}
              className={activemenu === 1 ? "navText activemenu" : "nav-text"}
            >
              <Link to="/">
                <AiIcons.AiFillHome className="icons" />
                Home
              </Link>
            </li>
            <li
              onClick={() => this.setState({ activemenu: 3 })}
              className={activemenu === 3 ? "navText activemenu " : "nav-text"}
            >
              <Link to="/donate">
                <FaIcons.FaDonate className="icons" />
                Donate
              </Link>
            </li>

            <li
              onClick={() => this.setState({ activemenu: 4 })}
              className={activemenu === 4 ? "navText activemenu " : "nav-text"}
            >
              <a href="#about">
                <BsIcons.BsFillInfoSquareFill className="icons" />
                About Us
              </a>
            </li>

            <li
              onClick={() => this.setState({ activemenu: 5 })}
              className={activemenu === 5 ? "navText activemenu" : "nav-text"}
            >
              <a href="#contact">
                <MdIcons.MdContactPhone className="icons" />
                Contact Us
              </a>
            </li>
            {authenticated ? (
              <li className="nav-text">
                <Link className="nav-link" to={`/profile`}>
                  <BsIcons.BsFillPersonFill className="icons" />
                  My account
                </Link>
              </li>
            ) : (
              ""
            )}
            {authenticated ? (
              <li className="nav-text">
                <Link
                  to=""
                  style={{ cursor: "pointer" }}
                  onClick={() => this.props.logout()}
                >
                  <BiIcons.BiLogOut className="icons" />
                  Logout
                </Link>
              </li>
            ) : (
              <li
                className="nav-text"
                className="dropdown"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "60px",
                  display: "flex",
                  padding: "8px 0 8px 16px",
                  textAlign: "center",
                }}
              >
                <Link
                  className="dropdown-toggle spLogin mt-3"
                  to="/login"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    padding: "0 16px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    width: "100%",
                    height: "100%",
                    border: "2px solid",
                    marginRight: "40%",
                  }}
                >
                  <BiIcons.BiLogIn
                    style={{ fontSize: "16px", marginRight: "10px" }}
                    className="icons"
                  />
                  Login
                </Link>

                <div className="dropdown-menu ">
                  <Link className="dropdown-item" to="/login">
                    Customer
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </nav>
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
  connect(mapStateToProps, mapDispatchToProps)(Navigationbar)
);
