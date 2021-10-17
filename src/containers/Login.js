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
    const { error, loading, token } = this.props;
    const { username, password } = this.state;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <ToastContainer position="bottom-right" />

        <Grid
          textAlign="center"
          style={{ height: "100vh", marginTop: "0px" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in as customer
            </Header>
            {error && <p>{this.props.error.message}</p>}

            <React.Fragment>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    onChange={this.handleChange}
                    value={username}
                    name="username"
                    fluid
                    icon="user"
                    iconPosition="left"
                    type="number"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 10))
                    }
                    placeholder="Enter 10 digit mobile number"
                    required
                  />
                  <Button
                    color="teal"
                    fluid
                    size="large"
                    loading={loading}
                    disabled={loading}
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <NavLink to="/signup">Sign Up</NavLink>
              </Message>
              <FbLogin
                appId="239018761503961"
                fields="name,email,picture"
                callback={(res) => this.responseFacebook(res)}
              />
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
