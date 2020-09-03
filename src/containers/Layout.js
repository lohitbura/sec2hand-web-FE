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
        token: '',
        active: 1
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.token !== this.props.token) {
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
        const {username, active} = this.state;
        return (
            <div>
                <div id="preloader">
                    <div classNameName="jumper">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <header className="">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container">
                            <Link className="nav-link" to="/">
                                <img style={{
                                    width: '69px',
                                    marginTop: '-21px'
                                }} src="/assets/images/Sec2Hand_Logo_3.png" alt=""/>
                            </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarResponsive" aria-controls="navbarResponsive"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarResponsive">
                                <ul className="navbar-nav ml-auto">
                                    <li onClick={() => this.setState({active: 1})}
                                        className={active === 1 ? "active nav-item" : 'nav-item'}>
                                        <Link className="nav-link" to="/">
                                            Home
                                        </Link>
                                    </li>

                                    <li onClick={() => this.setState({active: 2})}
                                        className={active === 2 ? "active nav-item" : 'nav-item'}>
                                        <Link className="nav-link" to="/review">
                                            Review
                                        </Link>
                                    </li>
                                    <li onClick={() => this.setState({active: 3})}
                                        className={active === 3 ? "active nav-item" : 'nav-item'}>
                                        <Link className="nav-link" to="/dealer">
                                            Find dealer
                                        </Link>
                                    </li>


                                    <li onClick={() => this.setState({active: 4})}
                                        className={active === 4 ? "active nav-item" : 'nav-item'}>
                                        <a className="nav-link" href="#about">
                                            About Us
                                        </a>
                                    </li>

                                    <li onClick={() => this.setState({active: 5})}
                                        className={active === 5 ? "active nav-item" : 'nav-item'}>
                                        <a href="#contact" className="nav-link" >
                                            Contact Us
                                        </a>
                                    </li>
                                    {authenticated ? (
                                        <li onClick={() => this.setState({active: 6})}
                                            className={active === 6 ? "active nav-item" : 'nav-item'}>
                                            <Link className="nav-link" to={`/profile/${username}`}>
                                                My account
                                            </Link>
                                        </li>
                                    ) : ''}
                                    {
                                        authenticated ? <li
                                            className='nav-item'>
                                            <Link to="" style={{cursor: "pointer"}} className="nav-link"
                                               onClick={() => this.props.logout()}>
                                                Logout
                                            </Link>
                                        </li> : <li className="nav-item dropdown">
                                            <a style={{cursor: "pointer"}} className="nav-link dropdown-toggle" data-toggle="dropdown"
                                               role="button" aria-haspopup="true" aria-expanded="false">Login</a>

                                            <div className="dropdown-menu">
                                                {/*<a  href="blog.html">Blog</a>*/}
                                                <Link className="dropdown-item" to="/dealer-login">
                                                    Dealer
                                                </Link>
                                                <Link className="dropdown-item" to="/login">
                                                    Customer
                                                </Link>
                                            </div>
                                        </li>
                                    }

                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                {/*<Menu inverted>*/}
                {/*    <Container>*/}
                {/*        <Link to="/">*/}
                {/*            <Menu.Item header>Home</Menu.Item>*/}
                {/*        </Link>*/}
                {/*        <Link to="/review">*/}
                {/*            <Menu.Item header>Review</Menu.Item>*/}
                {/*        </Link>*/}
                {/*<Link to="/dealer">*/}
                {/*        <Menu.Item header>Find dealer</Menu.Item>*/}
                {/*    </Link>*/}
                {/*{authenticated ? (*/}
                {/*    <Menu.Menu position="right">*/}
                {/*        <Menu.Item header>*/}
                {/*            <Link to={`/profile/${username}`}>*/}
                {/*                Profile*/}
                {/*            </Link>*/}
                {/*        </Menu.Item>*/}
                {/*    </Menu.Menu>*/}

                {/*) : ''*/}
                {/*}*/}
                {/*        {authenticated ? (*/}
                {/*            <Menu.Item header onClick={() => this.props.logout()}>*/}
                {/*                Logout*/}
                {/*            </Menu.Item>*/}
                {/*        ) : (*/}
                {/*            <React.Fragment>*/}
                {/*                <Menu.Menu position="right">*/}
                {/*                    <Dropdown item text='Login'>*/}
                {/*                        <Dropdown.Menu style={{color: 'black'}}>*/}
                {/*                            <Dropdown.Item>
                <Link style={{color: "black"}} to="/login">*/}
                {/*                                Customer*/}
                {/*                            </Link>
                </Dropdown.Item>*/}
                {/*                            <Dropdown.Item>
                <Link style={{color: "black"}} to="/dealer-login">*/}
                {/*                                Dealer*/}
                {/*                            </Link>
                </Dropdown.Item>*/}
                {/*                        </Dropdown.Menu>*/}
                {/*                    </Dropdown>*/}
                {/*                </Menu.Menu>*/}
                {/*            </React.Fragment>*/}
                {/*        )}*/}
                {/*    </Container>*/}
                {/*</Menu>*/}
                {this.props.children}


                <footer style={{background: "black", marginTop: "50px"}}>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="inner-content">
                                <p>About our office</p>
                                <p> Jodhpur <br/>
                                    Rajasthan
                                    <br/>
                                    Email - support@sec2hand.com</p>
                                <p >
                                    <Link style={{color: "white"}} to="/privacy">
                                        Privacy policy
                                    </Link>
                                </p>
                                <p style={{color: "white"}}>Copyright © 2020 Company Name : <a
                                    href="">Sec2Hand</a></p>
                            </div>
                        </div>
                    </div>

                </footer>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        token: state.auth.token
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
