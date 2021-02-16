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
import {authSignup} from "../store/actions/auth";
import {ToastContainer} from "react-toastify";

class RegistrationForm extends React.Component {
    state = {
        username: "",
        phone: "",
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleSubmit = e => {
        e.preventDefault();
        const {username, phone} = this.state;
        this.props.signup(username, phone, this.props.history);
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {username, phone} = this.state;
        const {error, loading, token} = this.props;
        if (token) {
            return <Redirect to="/"/>;
        }
        return (
            <div>
                <ToastContainer position="bottom-right"/>

                <Grid
                    textAlign="center"
                    style={{height: "100vh", marginTop:'0px'}}
                    verticalAlign="middle"
                >
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as="h2" color="teal" textAlign="center">
                            Signup as customer
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
                                        placeholder="Username"
                                    />
                                    <Form.Input
                                        onChange={this.handleChange}
                                        value={phone}
                                        name="phone"
                                        fluid
                                        type="number" onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
                                        icon="phone"
                                        iconPosition="left"
                                        placeholder="Phone"
                                    />

                                    <Button
                                        color="teal"
                                        fluid
                                        size="large"
                                        loading={loading}
                                        disabled={loading}
                                    >
                                        Signup
                                    </Button>
                                </Segment>
                            </Form>
                            <Message>
                                Already have an account? <NavLink to="/login">Login</NavLink>
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
        signup: (username, phone, history) =>
            dispatch(authSignup(username, phone, history))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationForm);
