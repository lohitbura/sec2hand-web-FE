import React from "react";
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from "semantic-ui-react";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {authLogin} from "../store/actions/auth";
import {ToastContainer} from "react-toastify";

class LoginForm extends React.Component {
    state = {
        username: "",
        password: ""
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const {username} = this.state;
        this.props.login(username, this.props.history);
    };

    render() {
        const {error, loading, token} = this.props;
        const {username, password} = this.state;
        if (token) {
            return <Redirect to="/"/>;
        }
        return (
            <div>
                <ToastContainer position="bottom-right"/>

                <Grid
                    textAlign="center"
                    style={{height: "100vh"}}
                    verticalAlign="middle"
                >
                    <Grid.Column style={{maxWidth: 450}}>
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
                                        type="number" onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
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
                        </React.Fragment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (username, history) => dispatch(authLogin(username, history))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
