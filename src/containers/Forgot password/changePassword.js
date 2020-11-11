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
import {authLogin, verifyOtp} from "../../store/actions/auth";
import {ToastContainer} from "react-toastify";
import {otpVerify, resetPassword} from "../../store/actions/forgotPassword";

class ChangePassword extends React.Component {
    state = {
        password1: "",
        password2: ""
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const {password1, password2} = this.state;
        this.props.verifyLoginOtp(password1, password2, this.props.history);
    };

    render() {
        const {error, loading, token} = this.props;
        const {password1, password2} = this.state;
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
                            Change password
                        </Header>
                        {error && <p>{this.props.error.message}</p>}

                        <React.Fragment>
                            <Form size="large" onSubmit={this.handleSubmit}>
                                <Segment stacked>
                                    <Form.Input
                                        onChange={this.handleChange}
                                        value={password1}
                                        name="password1"
                                        type="password"
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="New password"
                                    />
                                    <Form.Input
                                        onChange={this.handleChange}
                                        value={password2}
                                        name="password2"
                                        type="password"
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="Confirm password"
                                    />

                                    <Button
                                        color="teal"
                                        fluid
                                        size="large"
                                    >
                                        Login
                                    </Button>
                                </Segment>
                            </Form>
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
        verifyLoginOtp: (password1, password2, history) => dispatch(resetPassword(password1, password2, history))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);
