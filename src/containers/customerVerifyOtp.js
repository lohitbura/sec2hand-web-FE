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
import { authLogin, verifyOtp } from "../store/actions/auth";
import { ToastContainer } from "react-toastify";

class CustomerVerifyOtp extends React.Component {
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
    this.props.verifyLoginOtp(username, this.props.history);
  };

  render() {
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
              borderRadius: 40,
              height: 400,
            }}
          >
            <Header
              as="h2"
              style={{ color: "#5b1c03", marginTop: 40 }}
              textAlign="center"
            >
              Verify OTP
            </Header>
            {error && <p>{this.props.error.message}</p>}

            <React.Fragment>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Form.Input
                  onChange={this.handleChange}
                  value={username}
                  name="username"
                  fluid
                  type="number"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 6))}
                  placeholder="OTP"
                />

                <Button color="#5b1c03" fluid size="large">
                  Login
                </Button>
              </Form>
              <Message>
                New to us? <NavLink to="/signup">Sign Up</NavLink>
              </Message>
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
    verifyLoginOtp: (username, history) =>
      dispatch(verifyOtp(username, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerVerifyOtp);
