import React from 'react';
import {Container, Image} from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import { Icon } from "semantic-ui-react";
import { Carousel } from "react-bootstrap";
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
import {getUserProfileIdURL, getUserProfileURL ,productDetailURL, postLikeURL, URL} from "../../store/constants";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './product.css';
import * as FcIcons from "react-icons/fc";
import * as GrIcons from "react-icons/gr";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ProductDesc from '../ProductDesc';
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";
import { MapContainer } from '../MapContainer';



class ProductDetail extends React.Component {
    state = {
        product: {},
        profile: {},
        username: '',
        posts: [],
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const {id} = this.props.match.params;
        const token = localStorage.getItem('token')
        var {usernames}=this.state;

        axios.get(productDetailURL(id)).then(res => {
            this.setState({
                product: res.data
            })
            usernames=res.data.user;
            this.setState({loader: true})
                axios.get(getUserProfileURL(usernames)).then(res => {
                    this.setState({
                        loader: false, 
                        profile: res.data,
                        posts: res.data.posts
                    })
                    localStorage.setItem('category', res.data.category)
                })
                    .catch(err => {
                        console.log(err)
                        this.setState({loader: false})
                    })
        })
            .catch(err => {
                console.log(err)
            })
            

        let header = {
            Authorization: `Token ${token}`
        };
        axios.get(getUserProfileIdURL, {headers: header}).then(res => {
            this.setState({
                username: res.data.user
            })
        })
        
    }
    likes = (id) => {
        const {posts} = this.state;

        posts.map(post => {
            if (post.id === id) {
                if (post.is_like && post.is_like) {
                    this.likesHandle("unlike", post.id)
                } else {
                    this.likesHandle("like", post.id)
                }
            }
        })
    };

    likesHandle = (value, id) => {
        // const id = this.state.post.id;
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        this.setState({action: value}, () => {
            axios.post(postLikeURL, {"post_id": id, "action": this.state.action}, {headers: headers})
                .then(res => {
                    this.setState({post: res.data})
                    this.fetchProfile()
                })
        })
    };


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
        const { product, profile, username } = this.state;
        
        
        return (
          <div>
            <div className="">
              <div className="container-fluid">
                <div className="row"></div>
              </div>
            </div>

            <div className="container-fluid products">
              <ToastContainer position="bottom-left" />
              <div className="container-fluid ">
                <div className="row">
                  <div className="col-lg-9 col-md-9 col-sm-12 productCaraousel">
                    {/*<div>*/}
                    {/*    <img src={`${URL}${product.images && product.images[0].image}`} alt=""*/}
                    {/*         className="img-fluid wc-image"/>*/}
                    {/*</div>*/}
                    <br />
                    {/*<div className="row">*/}
                    {/*    <div className="col-sm-4 col-6">*/}
                    {/*        <div>*/}
                    {/*            <img src="assets/images/product-1-370x270.jpg" alt=""*/}
                    {/*                 className="img-fluid"/>*/}
                    {/*        </div>*/}
                    {/*        <br/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/* <Carousel >
                      {product.images &&
                        product.images.map((image) => {
                          return (
                            <Carousel.Item className="carouselSlider">
                              <Magnifier
                                imageSrc={`${URL}${image.image}`}
                                imageAlt="product image"
                              />
                            </Carousel.Item>
                          );
                        })}
                    </Carousel> */}
                    <CarouselProvider
                      visibleSlides={1}
                      totalSlides={product.images && product.images.length}
                      step={1}
                      dragStep={1}
                      naturalSlideWidth={100}
                      naturalSlideHeight={75}
                      hasMasterSpinner
                    >
                      <Slider
                        style={{
                          maxWidth: "1920px",
                          maxHeight: "80vh",
                          borderRadius: "10px",
                          marginTop: "-15px",
                          backgound: "black",
                        }}
                      >
                        {product.images &&
                          product.images.map((image) => {
                            return (
                              <Slide index={image.id}>
                                <ImageWithZoom
                                  className="carouselImageProduct"
                                  src={`${URL}${image.image}`}
                                />
                                {/* <img
                                  className="carouselImageProduct"
                                  src={`${URL}${image.image}`} */}
                                
                              </Slide>
                            );
                          })}
                      </Slider>
                      <ButtonBack primary className="backBtn">
                        <GrIcons.GrPrevious className="iconNext" />
                      </ButtonBack>
                      <ButtonNext className="nextBtn">
                        <GrIcons.GrNext className="iconNext" />
                      </ButtonNext>
                    </CarouselProvider>
                  </div>

                  <div className="col-lg-3 col-md-3 col-sm-12">
                    <div className="product-Details">
                      <div className="container-fluid">
                        <div className="row basicDetails">
                          <div className="col-lg-12 col-md-12 text-center">
                            <div className="productName">
                              <a>{product.brand} </a>
                            </div>
                            <div>
                              <strong className="priceText">
                                ₹{product.price}
                              </strong>
                            </div>
                            <div className="productYear">
                              <a>{product.year} Model </a>
                            </div>
                            <div className="productYear">
                              <a>{product.km} km</a>
                            </div>
                            <div className="productNo productNoHider">
                              8257361585
                            </div>
                          </div>
                        </div>
                        <div className="row basicDetails dealerHider text-center mt-3">
                          <div>
                            {profile.image ? (
                              <img
                                src={`${profile.image}`}
                                alt="dealerImage"
                                style={{
                                  width: "65px",
                                  height: "65px",
                                  borderRadius: "50%",
                                }}
                              />
                            ) : (
                              <img
                                src="../../assets/images/profile.png"
                                style={{
                                  width: "65px",
                                  height: "65px",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </div>
                          <div className="upperContent">Dealer Details</div>
                          <div className="DealerName text-center">
                            Name-{profile.user}{" "}
                          </div>
                          <div className="productNo">{profile.phone}</div>
                          <div className="productAdd">
                            address- {profile.address}
                            {this.uname}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <center>
              <Tabs
                defaultActiveKey="Desc"
                id="uncontrolled-tab-example"
                className="descriptionUl"
              >
                <Tab eventKey="Desc" title="Description">
                  <ProductDesc
                    product={product}
                    category={profile.category}
                    usernames={username}
                  />
                </Tab>
                <Tab eventKey="Dealer" title="Dealer Details">
                  <div className="row descriptionUl text-center">
                    <div className=" text-center mt-3">
                      <div className="basicDetails">
                        {profile.image ? (
                          <img
                            src={`${profile.image}`}
                            alt="profile image"
                            style={{ width: "200px", height: "200px" }}
                          />
                        ) : (
                          <img
                            src="../../assets/images/profile.png"
                            alt="profile image"
                            style={{ width: "200px", height: "200px" }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="dealerD">
                      <ul className="dealerList">
                        <li className="m-3">
                          Name -<strong>{profile.user}</strong>
                        </li>
                        <li className="m-3">
                          Address-
                          <strong>{profile.address}</strong>
                        </li>
                        <li className="m-3">
                          Phone-
                          <strong>{profile.phone}</strong>
                        </li>
                         <li className="m-3">
                          Shop Name-
                          <strong>{profile.shop_name}</strong>
                        </li>
                        <li className="m-3">
                          City-
                          <strong>{profile.city}</strong>
                        </li>
                        {/* <li className="m-3">
                          Area- <strong>{profile.area}</strong>
                        </li> */}
                        <li className="m-3">
                          No. of Total Products :
                          <strong>
                            {profile.products && profile.products.length}
                          </strong>
                        </li>
                      </ul>
                    </div>
                    <div className="dealerD">
                      <h4>Best Deals</h4>
                      {profile.posts &&
                        profile.posts.map((post) => {
                          return (
                            <div>
                              <div className="product-item">
                                <Link
                                  to={`/post/${post.id}`}
                                  style={{ decoration: "none" }}
                                >
                                  <img
                                    style={{
                                      height: "232px",
                                      objectFit: "cover",
                                    }}
                                    src={`${post.image}`}
                                    alt=""
                                  />
                                </Link>
                                <div className="down-content">
                                  <a href="car-details.html">
                                    <h5 style={{ marginBottom: "5px" }}>
                                      <Link
                                        style={{ color: "black" }}
                                        to={`/post/${post.id}`}
                                      >
                                        {post.description}
                                      </Link>
                                    </h5>
                                  </a>
                                  <strong>
                                    <i>Author:</i>
                                    <Link to={`/profile/${post.user}`}>
                                      {post.user}
                                    </Link>
                                  </strong>
                                  <br />
                                  <br />
                                  <Grid columns={2}>
                                    <Grid.Column style={{ color: "red" }}>
                                      {post.is_like && post.is_like ? (
                                        <Icon
                                          onClick={() => this.likes(post.id)}
                                          name="heart"
                                          size="large"
                                        />
                                      ) : (
                                        <Icon
                                          size="large"
                                          onClick={() => this.likes(post.id)}
                                          name="heart outline"
                                        />
                                      )}
                                      {post.likes_count} likes
                                    </Grid.Column>
                                    <Grid.Column>
                                      <Icon name="comments" />
                                      {post.comments_counts} comments
                                    </Grid.Column>
                                  </Grid>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="descriptionUl" >
                                {/* <MapContainer lat={profile.latitude} long={ profile.longitude}/>     */}
                            </div>
                  <div>
                    <div className="container productsDetails">
                      <span className="dealerProfileProductName">
                        Products of this Dealer{" "}
                      </span>
                      <div className="row mt-5">
                        {profile.products &&
                          profile.products.map((product) => {
                            return (
                              <div className="col-lg-4 col-md-6">
                                <div className="product-item">
                                  <Link to={`/product/${product.slug}`}>
                                    {product.images &&
                                    product.images[0] !== undefined ? (
                                      <img
                                        style={{
                                          height: "232px",
                                          objectFit: "cover",
                                        }}
                                        src={`${URL}${
                                          product.images &&
                                          product.images[0].image
                                        }`}
                                        alt=""
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </Link>
                                  <div className="down-content">
                                    <h4>
                                      <Link to={`/product/${product.id}`}>
                                        {product.model}
                                      </Link>
                                    </h4>

                                    <h6>
                                      <small></small> ₹ {product.price}
                                    </h6>

                                    {/*<p>190 hp &nbsp;/&nbsp; Petrol &nbsp;/&nbsp; 2008 &nbsp;/&nbsp; Used*/}
                                    {/*    vehicle</p>*/}

                                    <small>
                                      {product.km === null ? (
                                        ""
                                      ) : (
                                        <strong title="Author">
                                          <i className="fa fa-dashboard"></i>
                                          {product.km}km
                                        </strong>
                                      )}
                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                      <strong title="Author">
                                        <i className="fa fa-cube"></i>{" "}
                                        {product.color}
                                      </strong>
                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                      {/*<strong title="Views"><i*/}
                                      {/*    className="fa fa-cog"></i> Manual</strong>*/}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
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
        );
    }
}

export default ProductDetail;
