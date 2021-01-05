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
import './productDetail/product.css';
import * as FcIcons from "react-icons/fc";
import * as GrIcons from "react-icons/gr";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


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
                <div className="">
                    <div className="container-fluid">
                        <div className="row">        
                        </div>
                    </div>
                </div>

                <div className="container-fluid products">
                    <ToastContainer position="bottom-left"/>
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-12 productCaraousel">
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
                                    <Slider style={{maxWidth: '900px',maxHeight:'80vh', borderRadius:'10px',marginTop:'-15px',backgound:'black'}}>
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
                                    <ButtonBack primary className="backBtn" ><GrIcons.GrPrevious className="iconNext"/></ButtonBack>
                                    <ButtonNext className="nextBtn"><GrIcons.GrNext className="iconNext" /></ButtonNext>
                                </CarouselProvider>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-12">
                               
                                <div className="product-Details">
                                    <div className="container-fluid">
                                        <div className="row basicDetails">
                                            <div className="col-lg-12 col-md-12 text-center">
                                                <div className="productName"><a>{product.brand} </a></div>
                                                <div><strong className="priceText">₹{product.price}</strong></div>
                                                <div className="productYear"><a>{product.year} Model </a></div>
                                                <div className="productYear"><a>{product.km} km</a></div> 
                                                <div className="productNo productNoHider">8257361585</div>
                                            </div>        
                                        </div>
                                        <div className="row basicDetails dealerHider text-center mt-3">
                                            <div><img src="../../assets/images/profile.png" style={{width:'65px',height:'65px' }}/></div>
                                            <div className="upperContent">Dealer Details</div>
                                            <div className="DealerName text-center">Name </div>
                                            <div className="productNo">8257361585</div>
                                            <div className="productAdd">address- jha bolo wha hajir </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


<center>
                
                    <Tabs defaultActiveKey="Desc" id="uncontrolled-tab-example" className="descriptionUl">
                        <Tab eventKey="Desc" title="Description">
                        <div className="row mt-5 descriptiontab">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-8 offset-2 mt-8">
                                  <form action="#" method="post" className="form">
                                    <ul className="list-group list-group-flush">
                                       
                                        <li className="list-group-item">
                                            <div className="clearfix">
                                                <span className="pull-left"> Brand</span>

                                                <strong className="pull-right">{product.brand}</strong>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="clearfix">
                                                <span className="pull-left"> Model</span>
                                                <strong className="pull-right">{product.model}</strong>
                                            </div>
                                        </li>
                                        {
                                            product.fuel_type ? <li className="list-group-item">
                                                <div className="clearfix">
                                                    <span className="pull-left"> Fuel Type</span>

                                                    <strong className="pull-right">{product.fuel_type}</strong>
                                                </div>
                                            </li> : ''
                                        }


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
                                                <span className="pull-left">Year</span>

                                                <strong className="pull-right">{product.year}</strong>
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
                                        <Link to={`/productEdit/${product.slug}`}>
                                            <Button content='Edit' color="green"/>
                                        </Link>
                                        <Button onClick={() => this.deleteProduct(product.slug)} content='Delete'
                                                color="red"/>
                                    </div> : ''
                                } 
                              </div>
                           </div>
                      </Tab>
                            <Tab eventKey="Dealer" title="Dealer Details">
                                <div className="row descriptionUl text-center">
                                    
                                        <div className="basicDetails text-center mt-3">
                                                <div><img src="../../assets/images/profile.png" style={{width:'200px',height:'200px' }}/></div>
                                                
                                        </div>
                                        <div className="dealerD">
                                            <ul className="dealerList">
                                                <li className="m-3">Name - Pankaj Verma </li>
                                                <li className="m-3">Address - Jodhpur </li>
                                                <li className="m-3">Phone- 982579216864 </li>
                                                <li className="m-3">City- Jodhpur  </li>
                                                <li className="m-3">No. of Total Products </li>
                                            </ul>
                                        </div>
                                        <div className="dealerD">
                                             <h4>Best Deals</h4>
                                             <a>Here We can show Best Deals of this Dealer</a>
                                        </div>
                                   

                                </div>
                                <div className="descriptionUl" >
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14318.974570743832!2d73.00510519999999!3d26.20501635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1609847722242!5m2!1sen!2sin" width="100%" height="450" frameborder="0" style={{border:'0'}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                                </div>
                                
                            </Tab>
                </Tabs>
                </center>
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
