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
import { authSignup } from "../store/actions/auth";
import { ToastContainer } from "react-toastify";

class RegistrationForm extends React.Component {
  state = {
    username: "",
    phone: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, phone } = this.state;
    this.props.signup(username, phone, this.props.history);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, phone } = this.state;
    const { error, loading, token } = this.props;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div
        style={{ paddingTop: "100px", background: "#e6b05b", height: "100vh" }}
      >
        <ToastContainer position="bottom-right" />
        <Grid textAlign="center" s>
          <Grid.Column
            style={{
              maxWidth: 450,
              background: "#f6f6f6",
              borderRadius: 40,
              height: 400,
            }}
          >
            <Header
              as="h2"
              style={{ color: "#5b1c03", marginTop: 40 }}
              textAlign="center"
            >
              SIGNUP
            </Header>
            {error && <p>{this.props.error.message}</p>}

            <React.Fragment>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Form.Input
                  onChange={this.handleChange}
                  value={username}
                  name="username"
                  fluid
                  placeholder="Username"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={phone}
                  name="phone"
                  fluid
                  type="number"
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 10))
                  }
                  placeholder="Phone"
                />

                <Button
                  color="#5b1c03"
                  fluid
                  size="large"
                  loading={loading}
                  disabled={loading}
                >
                  Signup
                </Button>
              </Form>
              <Message>
                Already have an account? <NavLink to="/login">Login</NavLink>
              </Message>
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
    signup: (username, phone, history) =>
      dispatch(authSignup(username, phone, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
