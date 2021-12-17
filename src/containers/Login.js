import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authLogin, facebookLogin } from "../store/actions/auth";
import { ToastContainer } from "react-toastify";
import FbLogin from "react-facebook-login";
// import facebookLogin from "../store/actions/facebookLogin";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username } = this.state;
    this.props.login(username, this.props.history);
  };

  responseFacebook = async (response) => {
    this.props.facebookLogin(response.accessToken, this.props.history);

    // facebookLogin(response.accessToken);
  };

  render() {
    console.log(this.props);
    const { error, loading, token } = this.props;
    const { username, password } = this.state;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div
        style={{ paddingTop: "100px", background: "#e6b05b", height: "100vh" }}
      >
        <ToastContainer position="bottom-right" />

        <Grid textAlign="center">
          <Grid.Column
            style={{
              maxWidth: 450,
              background: "#f6f6f6",
              borderRadius: 10,
              height: 400,
            }}
          >
            <Header
              as="h2"
              style={{ color: "#5b1c03", marginTop: 40 }}
              textAlign="center"
            >
              LOGIN VIA OTP
            </Header>
            {error && <p>{this.props.error.message}</p>}

            <React.Fragment>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Form.Input
                  onChange={this.handleChange}
                  value={username}
                  name="username"
                  fluid
                  // icon="user"
                  // iconPosition="left"
                  type="number"
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 10))
                  }
                  placeholder="Enter 10 digit mobile number"
                  required
                />
                <Button
                  color="#5b1c03"
                  fluid
                  size="large"
                  loading={loading}
                  disabled={loading}
                >
                  Send OTP
                </Button>
              </Form>
              <Message>
                New to us? <NavLink to="/signup">Sign Up</NavLink>
              </Message>
              <FbLogin
                appId="239018761503961"
                fields="name,email,picture"
                callback={(res) => this.responseFacebook(res)}
                icon="fa-facebook"
              />
              <p
                style={{ color: "#5b1c03", marginTop: 100, fontWeight: "bold" }}
              >
                WE WILL NOT DISCLOSE YOUR PERSONAL INFORMATION TO ANYONE
              </p>{" "}
              <p
                style={{ color: "#5b1c03", marginTop: 20, fontWeight: "bold" }}
              >
                IF YOU LOGIN OR SIGNUP YOU ARE ACCEPTING SEC2HAND TERMS &
                CONDITIONS AND PRIVACY POLICY
              </p>
            </React.Fragment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, history) => dispatch(authLogin(username, history)),
    facebookLogin: (token, history) => dispatch(facebookLogin(token, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
