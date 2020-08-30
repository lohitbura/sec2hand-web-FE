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

import {productListURL, URL} from "../store/constants";
// import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Loader from 'react-loader-spinner';

class HomepageLayout extends React.Component {

    state = {
        products: [],
        limit: 6,
        offset: 0,
        loading: false,
        error: false,
        has_more: true
    }

    constructor(props) {
        super(props);

        window.onscroll = () => {
            const {
                state: {has_more, loading, error}
            } = this;

            if (!has_more) return;
            if ((document.documentElement.scrollHeight - document.documentElement.scrollTop - 200) <= document.documentElement.clientHeight) {
                this.loadProducts()
            }
        }
    }

    componentWillMount() {
        this.loadProducts()
    }

    loadProducts = () => {
        const {limit, offset, products} = this.state;
        this.setState({loading: true})
        axios.get(productListURL(limit, offset)).then(res => {
            this.setState({
                products: [...products, ...res.data.products],
                loading: false,
                offset: limit + offset,
                has_more: res.data.has_more
            })
        })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {products, loading, has_more} = this.state;
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
                            src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                            alt="First slide"/></Slide>
                        }
                        <Slide index={2}><img
                            style={{'objectFit': 'cover', 'height': '100%', 'width': '100%'}}
                            src='https://bd.gaadicdn.com/processedimages/revolt-motors/rv-400/source/m_rv-400_11560855440.jpg?tr=w-360'
                            alt="First slide"/></Slide>
                        }
                        <Slide index={3}><img
                            style={{'objectFit': 'cover', 'height': '100%', 'width': '100%'}}
                            src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                            alt="First slide"/></Slide>
                        }
                    </Slider>
                </CarouselProvider>

                <div className="latest-products">
                    <div className="container">

                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2>Featured Products</h2>
                                    <a href="cars.html">view more <i className="fa fa-angle-right"></i></a>
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
                                                    <img
                                                        src={`${URL}${product.image}`}
                                                        alt=""/>
                                                </Link>
                                                <div className="down-content">
                                                    <h4>
                                                        <Link to={`/product/${product.id}`}>
                                                            {product.model}
                                                        </Link>
                                                    </h4>

                                                    <h6><small>
                                                        <del> ₹ {product.price}</del>
                                                    </small> ₹ {product.price}
                                                    </h6>

                                                    {/*<p>190 hp &nbsp;/&nbsp; Petrol &nbsp;/&nbsp; 2008 &nbsp;/&nbsp; Used*/}
                                                    {/*    vehicle</p>*/}

                                                    <small>
                                                        <strong title="Author"><i className="fa fa-dashboard"></i>
                                                            {product.km}km
                                                        </strong> &nbsp;&nbsp;&nbsp;&nbsp;
                                                        <strong title="Author"><i
                                                            className="fa fa-cube"></i> {product.color}
                                                        </strong>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <strong title="Views"><i
                                                            className="fa fa-cog"></i> Manual</strong>
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

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomepageLayout;
