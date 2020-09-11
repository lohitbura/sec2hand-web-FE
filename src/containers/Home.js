import PropTypes from "prop-types";
import React, {Component} from "react";
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility
} from "semantic-ui-react";
import {Link, withRouter} from "react-router-dom";


import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import Pagination from "semantic-ui-react/dist/commonjs/addons/Pagination";
import axios from 'axios';

import {dealerListURL, productListURL, URL} from "../store/constants";
// import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Loader from 'react-loader-spinner';
import {logout} from "../store/actions/auth";
import {connect} from "react-redux";

class HomepageLayout extends React.Component {

    state = {
        products: [],
        dealers: [],
        loading: false,
        limit: 27,
        limit2: 6,
        limit1: 6,
        offset: 0,
        offset2: 0,
        offset1: 0,
        has_more: true,
        city: '',
        area: '',
        category: ''
    }

    componentWillMount() {
        this.loadProducts()
        this.loadDealers()
    }

    loadProducts = () => {
        const {limit, offset, products} = this.state;
        this.setState({loading: true})
        axios.get(productListURL(limit, offset)).then(res => {
            this.setState({
                products: [...products, ...res.data.products],
                loading: false,
                offset: offset,
                has_more: res.data.has_more
            })
        })
            .catch(err => {
                console.log(err)
            })
    }

    check = () => {
        if (!this.props.authenticated) {
            this.props.history.push('/login')
        }
    }

    onChange = (e) => {
        console.log(e.target.name + ":" + e.target.value)
        localStorage.setItem(e.target.name, e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {dealers, city, area, category, limit1, offset1} = this.state;


        let form_data = new FormData();
        form_data.append('limit', limit1)
        form_data.append('offset', offset1)
        if (city) {
            form_data.append('city', city)
        }
        if (area) {
            form_data.append('area', area)
        }
        if (category) {
            form_data.append('category', category)
        }
        if (category && city && area) {
            form_data.append('category', category)
            form_data.append('area', area)
            form_data.append('city', city)
        }

        this.setState({loading: true})
        axios.post(dealerListURL, form_data).then(res => {
            if (offset1 === 0) {
                console.log(res.data.dealers)
                this.setState({
                    dealers: res.data.dealers,
                    loading: false,
                    has_more: res.data.has_more
                })
            } else {
                this.setState({
                    dealers: [...dealers, ...res.data.dealers],
                    loading: false,
                    offset: limit1 + offset1,
                    has_more: res.data.has_more
                })
            }

        })
            .catch(err => {
                console.log(err)
            })
    }

    loadDealers = () => {
        const {limit2, offset2, dealers} = this.state;
        this.setState({loading: true})
        axios.post(dealerListURL, {limit: limit2, offset: offset2}).then(res => {
            this.setState({
                dealers: [...dealers, ...res.data.dealers],
                loading: false,
                offset2: limit2 + offset2,
                has_more: res.data.has_more
            })
        })
            .catch(err => {
                console.log(err)
            })
    }

    fetchSearchDealers = () => {
        const {dealers, city, area, category, limit1, offset1} = this.state;


        let form_data = new FormData();
        form_data.append('limit', limit1)
        form_data.append('offset', offset1)
        if (city) {
            form_data.append('city', city)
        }
        if (area) {
            form_data.append('area', area)
        }
        if (category) {
            form_data.append('category', category)
        }
        if (category && city && area) {
            form_data.append('category', category)
            form_data.append('area', area)
            form_data.append('city', city)
        }

        this.setState({loading: true})
        axios.post(dealerListURL, form_data).then(res => {
            if (offset1 === 0) {
                console.log(res.data.dealers)
                this.setState({
                    dealers: res.data.dealers,
                    loading: false,
                    has_more: res.data.has_more
                })
            } else {
                this.setState({
                    dealers: [...dealers, ...res.data.dealers],
                    loading: false,
                    offset1: limit1 + offset1,
                    has_more: res.data.has_more
                })
            }

        })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {products, dealers, loading, has_more} = this.state;
        return (
            <div>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-content">
                                    <h4>
                                        <del></del>
                                        <strong className="text-primary"></strong></h4>
                                    <h2></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CarouselProvider style={{marginTop: "35px"}}
                                  naturalSlideWidth={110}
                                  naturalSlideHeight={50}
                                  totalSlides={3}
                                  isPlaying={true}
                                  interval={3000}
                >
                    <Slider>
                        <Slide index={1}><img
                            style={{'objectFit': 'cover', 'height': '100%', 'width': '100%'}}
                            src="/assets/images/slider1.jpg"
                            alt="First slide"/></Slide>

                        <Slide index={2}><img
                            style={{'objectFit': 'cover', 'height': '100%', 'width': '100%'}}
                            src="/assets/images/slider2.jpg"
                            alt="First slide"/></Slide>

                        <Slide index={3}><img
                            style={{'objectFit': 'cover', 'height': '100%', 'width': '100%'}}
                            src="/assets/images/slider3.jpg"
                            alt="First slide"/></Slide>
                        
                    </Slider>
                </CarouselProvider>
                <br/>
                <br/>
                <div className="container" style={{marginTop: "50px"}}>
                    <div className="row">
                        <div className="col-sm-4" style={{margin: 'auto'}}>
                            <div className="card">
                                <img className="card-img-top" src="/assets/images/customer3.jpg" alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">We Know our customer need.</h5>
                                    {/*<p className="card-text">We Know our customer need.</p>*/}
                                    {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4" style={{margin: 'auto'}}>
                            <div className="card">
                                <img className="card-img-top" src="/assets/images/customer-satisfaction.jpg"
                                     alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">Customer satisfaction is our top priority.</h5>
                                    {/*<p className="card-text">Customer satisfaction is our top priority.</p>*/}
                                    {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    !this.props.authenticated ?
                        <div className="latest-products">
                            <div className="container">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="section-heading">
                                            <h2>Featured Products</h2>
                                            {/*<p onClick={() => this.check} style={{cursor: 'pointer'}}>view more <i*/}
                                            {/*    className="fa fa-angle-right"></i></p>*/}
                                        </div>
                                        {
                                            loading ? <Loader
                                                style={{marginTop: "100px", textAlign: 'center'}}
                                                type="Rings"
                                                color="red"
                                                height={100}
                                                width={100}
                                            /> : ''
                                        }
                                    </div>

                                    {
                                        products.map(product => {
                                            return (
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="product-item">
                                                        <Link to={`/product/${product.id}`}>
                                                            <img style={{
                                                                height: '232px',
                                                                objectFit: 'cover'
                                                            }}
                                                                 src={`${URL}${product.images && product.images[0].image}`}
                                                                 alt=""/>
                                                        </Link>
                                                        <div className="down-content">
                                                            <h4>
                                                                <Link to={`/product/${product.id}`}>
                                                                    {product.model}
                                                                </Link>
                                                            </h4>

                                                            <h6><small>
                                                            </small> ₹ {product.price}
                                                            </h6>

                                                            {/*<p>190 hp &nbsp;/&nbsp; Petrol &nbsp;/&nbsp; 2008 &nbsp;/&nbsp; Used*/}
                                                            {/*    vehicle</p>*/}

                                                            <small>
                                                                {
                                                                    product.km === null ? '' : <strong title="Author"><i
                                                                        className="fa fa-dashboard"></i>
                                                                        {product.km}km
                                                                    </strong>
                                                                }
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <strong title="Author"><i
                                                                    className="fa fa-cube"></i> {product.color}
                                                                </strong>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                {/*<strong title="Views"><i*/}
                                                                {/*    className="fa fa-cog"></i> Manual</strong>*/}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                                <div style={{textAlign: "center", marginTop: "50px"}}>
                                    {
                                        !has_more ? "No more products" : ''
                                    }
                                    <Button onClick={() => this.check()} color="red"
                                    >View more</Button>

                                </div>
                            </div>
                        </div> : <div className="latest-products">
                            <div className="container">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="section-heading">
                                            <h2>Find a dealer</h2>
                                            {/*<p onClick={() => this.check} style={{cursor: 'pointer'}}>view more <i*/}
                                            {/*    className="fa fa-angle-right"></i></p>*/}
                                        </div>
                                    </div>
                                    <div className="col-md-6" style={{margin: 'auto'}}>

                                        <div className="contact-form">
                                            <form action="#">
                                                <label>City:</label>

                                                <input onChange={this.onChange} name="city" className="form-control"
                                                       type="text"
                                                       placeholder="search city"/>

                                                {/*<label>Area:</label>*/}

                                                {/*<input onChange={this.onChange} name="area" className="form-control"*/}
                                                {/*       type="text"*/}
                                                {/*       placeholder="search area"/>*/}
                                                <label>Category:</label>

                                                <select onChange={this.onChange} name="category" className="form-control">
                                                    <option>All</option>
                                                    <option value="car">Car</option>
                                                    <option value="bike">Bike</option>
                                                    <option value="mobile">Mobile</option>
                                                </select>

                                                <button onClick={(e) => this.onSubmit(e)}
                                                        className="filled-button btn-block">Search
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div style={{marginTop: '50px'}} className="col-md-12">

                                        <div className="row">
                                            {dealers.map(dealer => {
                                                return (
                                                    <div className="col-md-4">
                                                        <div className="product-item">
                                                            <Link to={`/profile/${dealer.user}`}>

                                                                {
                                                                    dealer.image ? <img style={{
                                                                            height: '232px',
                                                                            objectFit: 'cover'
                                                                        }} src={`${URL}${dealer.image}`}
                                                                                        alt=""/> :
                                                                        <img style={{
                                                                            height: '232px',
                                                                            objectFit: 'cover'
                                                                        }} src="/assets/images/profile-placeholder.png"
                                                                             alt=""
                                                                             className="img-fluid wc-image"/>
                                                                }
                                                            </Link>

                                                            <div className="down-content">
                                                                <Link to={`/profile/${dealer.user}`}>
                                                                    <h4>{dealer.shop_name}</h4>
                                                                </Link>

                                                                {/*<h6><small>*/}
                                                                {/*    <del> $11199.00</del>*/}
                                                                {/*</small> $11179.00*/}
                                                                {/*</h6>*/}

                                                                <p>Dealer:{dealer.user}</p>

                                                                <small>
                                                                    <strong title="Author"><i
                                                                        className="fa fa-home"/> {dealer.city}
                                                                    </strong> &nbsp;&nbsp;&nbsp;&nbsp;
                                                                    {/*<strong title="Author"><i*/}
                                                                    {/*    className="fa fa-home"/> {dealer.area}*/}
                                                                    {/*</strong>&nbsp;&nbsp;&nbsp;&nbsp;*/}
                                                                    <strong title="Views"><i
                                                                        className="fa fa-cubes"/> {dealer.category}</strong>
                                                                </small>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            })}

                                            <div className="col-md-12">
                                                {/*<ul className="pages">*/}
                                                {/*    <li><a href="#">1</a></li>*/}
                                                {/*    <li className="active"><a href="#">2</a></li>*/}
                                                {/*    <li><a href="#">3</a></li>*/}
                                                {/*    <li><a href="#">4</a></li>*/}
                                                {/*    <li><a href="#"><i className="fa fa-angle-double-right"></i></a></li>*/}
                                                {/*</ul>*/}
                                                <div style={{textAlign: "center", marginTop: "10px"}}>
                                                    {
                                                        loading ? <Loader
                                                            style={{marginTop: "100px", textAlign: 'center'}}
                                                            type="Rings"
                                                            color="red"
                                                            height={100}
                                                            width={100}
                                                        /> : ''
                                                    }
                                                    {
                                                        !has_more ? "No more dealers" : ''
                                                    }
                                                    <div className="row">
                                                        <div className="col-md-4" style={{margin: 'auto'}}>
                                                            <Button onClick={() => this.loadDealers()} color="red"
                                                                    disabled={!has_more}>
                                                                View more
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                }
                <div className="best-features about-features">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2 id="about">About Sec2hand</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="right-image">
                                    <img style={{
                                        marginTop: '-61px',
                                        // width: '402px',
                                    }} src="/assets/images/Sec2Hand_Logo_3.png" alt=""/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="left-content">
                                    <h4>About us</h4>
                                    <p>Sec2Hand is a leading e-commerce platform. which offers you the service to buy
                                        and sell second hand Bikes, Cars and Mobiles with trusted Dealers.
                                        Sec2hand works in C2B & B2C Market place.</p>
                                </div>
                                <br/>
                                <div className="left-content">
                                    <h4>Vision & Mission</h4>
                                    <p>We provide you with quality Second hand products.
                                        We are with you 24*7.</p>
                                    <ul className="social-icons">
                                        <li><a href="https://www.facebook.com/Sec2Hand-360972987823797/"><i
                                            className="fa fa-facebook"></i></a></li>
                                        <li><a
                                            href="https://www.instagram.com/invites/contact/?i=14qq181cy3b1b&utm_content=eghzw47 "><i
                                            className="fa fa-instagram"></i></a></li>
                                        <li><a href="https://www.youtube.com/c/Sec2hand"><i
                                            className="fa fa-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="contact">
                    <div className="send-message">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="section-heading">
                                        <h2>Send us a Message</h2>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="contact-form">
                                        <form id="contact" action="" method="post">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <fieldset>
                                                        <input name="name" type="text" className="form-control"
                                                               id="name"
                                                               placeholder="Full Name" required=""/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <fieldset>
                                                        <input name="email" type="text" className="form-control"
                                                               id="email"
                                                               placeholder="E-Mail Address" required=""/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <fieldset>
                                                        <input name="subject" type="text" className="form-control"
                                                               id="subject" placeholder="Subject" required=""/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-lg-12">
                                                    <fieldset>
                                                    <textarea name="message" rows="6" className="form-control"
                                                              id="message" placeholder="Your Message"
                                                              required=""/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-lg-12">
                                                    <fieldset>
                                                        <button type="submit" id="form-submit"
                                                                className="filled-button">Send Message
                                                        </button>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/*<div className="col-md-4">*/}
                                {/*    <img src="/assets/images/Sec2Hand_Logo_3.png" className="img-fluid" alt=""/>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
    )(HomepageLayout)
);