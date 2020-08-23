import React from "react";
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment
} from "semantic-ui-react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../store/actions/auth";
import axios from "axios";
import {getUserProfileIdURL} from "../store/constants";

class CustomLayout extends React.Component {
    state = {
        username: '',
        token: ''
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.token !== this.props.token){
            let headers = {
                Authorization: `Token ${localStorage.getItem('token')}`
            };
            axios.get(getUserProfileIdURL, {headers: headers}).then(res => {
                this.setState({username: res.data.user})
            })
        }
    }

    render() {
        const {authenticated} = this.props;
        const {username} = this.state;
        return (
            <div>
                <Menu inverted>
                    <Container>
                        <Link to="/">
                            <Menu.Item header>Home</Menu.Item>
                        </Link>
                        <Link to="/review">
                            <Menu.Item header>Review</Menu.Item>
                        </Link><Link to="/dealer">
                        <Menu.Item header>Find dealer</Menu.Item>
                    </Link>
                        {authenticated ? (
                            <Menu.Menu position="right">
                                <Menu.Item header>
                                    <Link to={`/profile/${username}`}>
                                        Profile
                                    </Link>
                                </Menu.Item>
                            </Menu.Menu>

                        ) : ''
                        }
                        {authenticated ? (
                            <Menu.Item header onClick={() => this.props.logout()}>
                                Logout
                            </Menu.Item>
                        ) : (
                            <React.Fragment>
                                <Menu.Menu position="right">
                                    <Dropdown item text='Login'>
                                        <Dropdown.Menu style={{color: 'black'}}>
                                            <Dropdown.Item><Link style={{color: "black"}} to="/login">
                                                Customer
                                            </Link></Dropdown.Item>
                                            <Dropdown.Item><Link style={{color: "black"}} to="/dealer-login">
                                                Dealer
                                            </Link></Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Menu>
                            </React.Fragment>
                        )}
                    </Container>
                </Menu>
                {this.props.children}

                <Segment
                    inverted
                    vertical
                    style={{margin: "5em 0em 0em", padding: "5em 0em"}}
                >
                    <Container textAlign="center">
                        <Grid divided inverted stackable>
                            <Grid.Column width={3}>
                                <Header inverted as="h4" content="Group 1"/>
                                <List link inverted>
                                    <List.Item as="a">Link One</List.Item>
                                    <List.Item as="a">Link Two</List.Item>
                                    <List.Item as="a">Link Three</List.Item>
                                    <List.Item as="a">Link Four</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as="h4" content="Group 2"/>
                                <List link inverted>
                                    <List.Item as="a">Link One</List.Item>
                                    <List.Item as="a">Link Two</List.Item>
                                    <List.Item as="a">Link Three</List.Item>
                                    <List.Item as="a">Link Four</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as="h4" content="Group 3"/>
                                <List link inverted>
                                    <List.Item as="a">Link One</List.Item>
                                    <List.Item as="a">Link Two</List.Item>
                                    <List.Item as="a">Link Three</List.Item>
                                    <List.Item as="a">Link Four</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header inverted as="h4" content="Footer Header"/>
                                <p>
                                    Extra space for a call to action inside the footer that could
                                    help re-engage users.
                                </p>
                            </Grid.Column>
                        </Grid>

                        <Divider inverted section/>
                        <Image centered size="mini" src="/logo.png"/>
                        <List horizontal inverted divided link size="small">
                            <List.Item as="a" href="#">
                                Site Map
                            </List.Item>
                            <List.Item as="a" href="#">
                                Contact Us
                            </List.Item>
                            <List.Item as="a" href="#">
                                Terms and Conditions
                            </List.Item>
                            <List.Item as="a" href="#">
                                Privacy Policy
                            </List.Item>
                        </List>
                    </Container>
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        token:state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CustomLayout)
);
