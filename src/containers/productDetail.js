import React from 'react';
import {Container} from "semantic-ui-react";
import {
    ButtonBack,
    ButtonFirst,
    ButtonLast,
    ButtonNext,
    CarouselProvider, DotGroup,
    ImageWithZoom,
    Slide,
    Slider
} from "pure-react-carousel";
import 'pure-react-carousel/dist/react-carousel.es.css';
import {Link, withRouter} from "react-router-dom";
import axios from 'axios';
import {getUserProfileIdURL, productDetailURL, URL} from "../store/constants";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class ProductDetail extends React.Component {
    state = {
        product: {},
        username: ''
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const {id} = this.props.match.params;
        const token = localStorage.getItem('token')

        axios.get(productDetailURL(id)).then(res => {
            this.setState({product: res.data})
        })
            .catch(err => {
                console.log(err)
            })

        let header = {
            Authorization: `Token ${token}`
        };
        axios.get(getUserProfileIdURL, {headers: header}).then(res => {
            this.setState({username: res.data.user})
        })
    }

    deleteProduct = (id) => {
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        axios.delete(productDetailURL(id), {headers: headers}).then(res => {
            console.log(res.data)
            toast.success("Product has been deleted!")
            setTimeout(() => {
                this.props.history.push('/')
            }, 2000)
        })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {product, username} = this.state;
        return (
            <div>
                <div className="page-heading about-heading header-text"
                     style={{'backgroundImage': `url(${URL}${product.images && product.images[0].image})`}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-content">
                                    <h4>
                                        <del>₹{product.price}</del>
                                        <strong className="text-primary">₹{product.price}</strong></h4>
                                    <h2>{product.model}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="products">
                    <ToastContainer position="bottom-right"/>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                {/*<div>*/}
                                {/*    <img src={`${URL}${product.images && product.images[0].image}`} alt=""*/}
                                {/*         className="img-fluid wc-image"/>*/}
                                {/*</div>*/}
                                <br/>
                                {/*<div className="row">*/}
                                {/*    <div className="col-sm-4 col-6">*/}
                                {/*        <div>*/}
                                {/*            <img src="assets/images/product-1-370x270.jpg" alt=""*/}
                                {/*                 className="img-fluid"/>*/}
                                {/*        </div>*/}
                                {/*        <br/>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <CarouselProvider
                                    visibleSlides={1}
                                    totalSlides={product.images && product.images.length}
                                    step={1}
                                    dragStep={2}
                                    naturalSlideWidth={400}
                                    naturalSlideHeight={300}
                                    hasMasterSpinner
                                >
                                    <Slider style={{maxWidth: '800px'}}>
                                        {
                                            product.images && product.images.map(image => {
                                                return (
                                                    <Slide index={image.id}>
                                                        <ImageWithZoom
                                                            src={`${URL}${image.image}`}/>
                                                    </Slide>
                                                )

                                            })
                                        }
                                    </Slider>
                                    <ButtonBack primary>Back</ButtonBack>
                                    <ButtonNext>Next</ButtonNext>
                                </CarouselProvider>
                            </div>

                            <div className="col-md-6">
                                <form action="#" method="post" className="form">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="clearfix">
                                                <span className="pull-left">Type</span>

                                                <strong className="pull-right">Used vehicle</strong>
                                            </div>
                                        </li>

                                        <li className="list-group-item">
                                            <div className="clearfix">
                                                <span className="pull-left"> Model</span>

                                                <strong className="pull-right">{product.model}</strong>
                                            </div>
                                        </li>

                                        <li className="list-group-item">
                                            {
                                                product.km === null ? '' : <div className="clearfix">
                                                    <span className="pull-left">Distance</span>

                                                    <strong className="pull-right">{product.km} km</strong>
                                                </div>
                                            }

                                        </li>

                                        <li className="list-group-item">
                                            <div className="clearfix">
                                                <span className="pull-left">Color</span>

                                                <strong className="pull-right">{product.color}</strong>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="clearfix">
                                                <span className="pull-left">Price</span>

                                                <strong className="pull-right">₹{product.price}</strong>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="clearfix">
                                                <span className="pull-left">Dealer profile</span>
                                                <Link to={`/profile/${product.user}`}>
                                                    <strong className="pull-right">{product.user}</strong>
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>
                                </form>
                                <br/>
                                {
                                    product.user === username ? <div>
                                        {/*<Link to={`/productEdit/${product.id}`}>*/}
                                        {/*    <Button content='Edit' color="green"/>*/}
                                        {/*</Link>*/}
                                        <Button onClick={() => this.deleteProduct(product.id)} content='Delete'
                                                color="red"/>
                                    </div> : ''
                                }

                            </div>
                        </div>
                    </div>
                </div>

                {/*<div className="section">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-md-6">*/}
                {/*                <div className="section-heading">*/}
                {/*                    <h2>Vehicle Description</h2>*/}
                {/*                </div>*/}

                {/*                <div className="left-content">*/}
                {/*                    <p>- Colour coded bumpers<br/>- Tinted glass<br/>- Immobiliser<br/>- Central locking*/}
                {/*                        -*/}
                {/*                        remote<br/>- Passenger airbag<br/>- Electric windows<br/>- Rear head rests<br/>-*/}
                {/*                        Radio<br/>- CD player<br/>- Ideal first car<br/>- Warranty<br/>- High level*/}
                {/*                        brake light<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit,*/}
                {/*                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.*/}
                {/*                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris*/}
                {/*                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in*/}
                {/*                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla*/}
                {/*                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in*/}
                {/*                        culpa qui officia deserunt mollit anim id est laborum.</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="col-md-6">*/}
                {/*                <div className="section-heading">*/}
                {/*                    <h2>Vehicle Extras</h2>*/}
                {/*                </div>*/}

                {/*                <div className="left-content">*/}
                {/*                    <p>- ABS <br/>-Leather seats <br/>-Power Assisted Steering <br/>-Electric heated*/}
                {/*                        seats <br/>-New HU and AU <br/>-Xenon headlights</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="section">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-md-6">*/}
                {/*                <div className="section-heading">*/}
                {/*                    <h2>Contact Details</h2>*/}
                {/*                </div>*/}

                {/*                <div className="left-content">*/}
                {/*                    <p>*/}
                {/*                        <span>Name</span>*/}

                {/*                        <br/>*/}

                {/*                        <strong>John Smith</strong>*/}
                {/*                    </p>*/}

                {/*                    <p>*/}
                {/*                        <span>Phone</span>*/}

                {/*                        <br/>*/}

                {/*                        <strong>*/}
                {/*                            <a href="tel:123-456-789">123-456-789</a>*/}
                {/*                        </strong>*/}
                {/*                    </p>*/}

                {/*                    <p>*/}
                {/*                        <span>Mobile phone</span>*/}

                {/*                        <br/>*/}

                {/*                        <strong>*/}
                {/*                            <a href="tel:456789123">456789123</a>*/}
                {/*                        </strong>*/}
                {/*                    </p>*/}

                {/*                    <p>*/}
                {/*                        <span>Email</span>*/}

                {/*                        <br/>*/}

                {/*                        <strong>*/}
                {/*                            <a href="mailto:john@carsales.com">john@carsales.com</a>*/}
                {/*                        </strong>*/}
                {/*                    </p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<CarouselProvider*/}
                {/*    naturalSlideWidth={110}*/}
                {/*    naturalSlideHeight={50}*/}
                {/*    totalSlides={1}*/}
                {/*    isPlaying={true}*/}
                {/*    interval={3000}*/}
                {/*>*/}
                {/*    <Slider>*/}
                {/*        <Slide index={1}>*/}
                {/*            <img*/}
                {/*                style={{'objectFit': 'cover', 'height': '100%', 'width': '100%'}}*/}
                {/*                src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'*/}
                {/*                alt="First slide"/></Slide>*/}
                {/*        }*/}
                {/*    </Slider>*/}
                {/*</CarouselProvider>*/}

                {/*<h2><Link to={`/profile/${product.user}`}>*/}
                {/*    Dealer: {product.user}*/}
                {/*</Link></h2>*/}
                {/*<h2>Price: {product.price}</h2>*/}
                {/*<h2>Model: {product.model}</h2>*/}
                {/*<h2>Km: {product.km}</h2>*/}
                {/*<h2>Color: {product.color}</h2>*/}
            </div>
        )
    }
}

export default ProductDetail;
