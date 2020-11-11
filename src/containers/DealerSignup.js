import React from "react";
import {
    Button, Container,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from "semantic-ui-react";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {authSignup, dealerAuthSignup} from "../store/actions/auth";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {fetchCity} from "../store/actions/cityList";
import csc from 'country-state-city'

class DealerSignup extends React.Component {
    state = {
        username: "",
        code: "",
        shop_name: "",
        address: "",
        phone: "",
        area: "",
        category: "",
        password1: "",
        password2: "",

        stateData: [],
        stateId: '',
        cityData: [],
        city: "",
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({
            stateData: csc.getStatesOfCountry("101")
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const {username, code, shop_name, address, phone, city, area, category, password1, password2} = this.state;
        this.props.signup(username, code, shop_name, address, phone, city, area, category, password1, password2);
    };

    handleChange = e => {
        if(e.target.name == "state"){
            this.setState({
                cityData: csc.getCitiesOfState(e.target.value)
            })
        }
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {username, code, shop_name, address, phone, city, area, category, password1, password2} = this.state;
        const {error, loading, token} = this.props;
        if (token) {
            return <Redirect to="/"/>;
        }
        return (
            <div>
                <ToastContainer position="bottom-right"/>

                <Grid
                    textAlign="center"
                    style={{height: "100%", marginTop: "100px"}}
                    verticalAlign="middle"
                >

                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as="h2" color="teal" textAlign="center">
                            Signup as dealer
                        </Header>
                        {error && <p>{this.props.error.message}</p>}

                        <React.Fragment>
                            <Form style={{marginTop: "55px"}} size="large" onSubmit={this.handleSubmit}>
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
                                        value={code}
                                        name="code"
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="code"
                                    />
                                    <Form.Input
                                        onChange={this.handleChange}
                                        value={shop_name}
                                        name="shop_name"
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="shop_name"
                                    />
                                    <Form.Input
                                        onChange={this.handleChange}
                                        value={address}
                                        name="address"
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="address"
                                    />
                                    <Form.Input
                                        onChange={this.handleChange}
                                        value={phone}
                                        name="phone"
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="phone"
                                    />
                                    <select onChange={this.handleChange}
                                            name="state" className="form-control">
                                        <option>Select State</option>
                                        {
                                            this.state.stateData.map(state => {
                                                return <option value={state.id}>{state.name}</option>
                                            })
                                        }
                                    </select>
                                    <br/>
                                    <select onChange={this.handleChange}
                                            name="city" className="form-control">
                                        <option>Select city</option>
                                        {
                                            this.state.cityData.map(state => {
                                                return <option value={state.name}>{state.name}</option>
                                            })
                                        }
                                    </select>
                                    <br/>
                                    <Form.Input
                                        onChange={this.handleChange}
                                        value={area}
                                        name="area"
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="area"
                                    />
                                    {/*<Form.Input*/}
                                    {/*    onChange={this.handleChange}*/}
                                    {/*    value={category}*/}
                                    {/*    name="category"*/}
                                    {/*    fluid*/}
                                    {/*    icon="user"*/}
                                    {/*    iconPosition="left"*/}
                                    {/*    placeholder="category"*/}
                                    {/*/>*/}
                                    <select onChange={this.handleChange}
                                            name="category" className="form-control">
                                        <option>Select category</option>
                                        <option value="car">Car</option>
                                        <option value="bike">Bike</option>
                                        <option value="mobile">Mobile</option>
                                    </select>
                                    <br/>
                                    <Form.Input
                                        onChange={this.handleChange}
                                        fluid
                                        value={password1}
                                        name="password1"
                                        icon="lock"
                                        iconPosition="left"
                                        placeholder="Password"
                                        type="password"
                                    />
                                    <Form.Input
                                        onChange={this.handleChange}
                                        fluid
                                        value={password2}
                                        name="password2"
                                        icon="lock"
                                        iconPosition="left"
                                        placeholder="Confirm password"
                                        type="password"
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
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signup: (username, code, shop_name, address, phone, city, area, category, password1, password2) =>
            dispatch(dealerAuthSignup(username, code, shop_name, address, phone, city, area, category, password1, password2)),
        fetchCityList: () => dispatch(fetchCity())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DealerSignup);
