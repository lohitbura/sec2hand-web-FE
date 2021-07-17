import React from "react";
import { Container, Image } from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import { Icon } from "semantic-ui-react";
import { Carousel } from "react-bootstrap";
import {
  ButtonBack,
  ButtonFirst,
  ButtonLast,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  ImageWithZoom,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import {
  getUserProfileIdURL,
  getUserProfileURL,
  productDetailURL,
  postLikeURL,
  URL,
} from "../../store/constants";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./product.css";
import * as GrIcons from "react-icons/gr";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ProductDesc from "./ProductDesc";

class ProductDetail extends React.Component {
  state = {
    product: {},
    profile: {},
    username: "",
    posts: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const { id } = this.props.match.params;
    const token = localStorage.getItem("token");
    var { usernames } = this.state;

    axios
      .get(productDetailURL(id))
      .then((res) => {
        this.setState({
          product: res.data,
        });
        usernames = res.data.user;
        this.setState({ loader: true });
        axios
          .get(getUserProfileURL(usernames))
          .then((res) => {
            this.setState({
              loader: false,
              profile: res.data,
              posts: res.data.posts,
            });
            localStorage.setItem("category", res.data.category);
          })
          .catch((err) => {
            console.log(err);
            this.setState({ loader: false });
          });
      })
      .catch((err) => {
        console.log(err);
      });

    let header = {
      Authorization: `Token ${token}`,
    };
    axios.get(getUserProfileIdURL, { headers: header }).then((res) => {
      this.setState({
        username: res.data.user,
      });
    });
  }
  likes = (id) => {
    const { posts } = this.state;

    posts.map((post) => {
      if (post.id === id) {
        if (post.is_like && post.is_like) {
          this.likesHandle("unlike", post.id);
        } else {
          this.likesHandle("like", post.id);
        }
      }
    });
  };

  likesHandle = (value, id) => {
    // const id = this.state.post.id;
    let headers = {
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    this.setState({ action: value }, () => {
      axios
        .post(
          postLikeURL,
          { post_id: id, action: this.state.action },
          { headers: headers }
        )
        .then((res) => {
          this.setState({ post: res.data });
          this.fetchProfile();
        });
    });
  };

  deleteProduct = (id) => {
    let headers = {
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    axios
      .delete(productDetailURL(id), { headers: headers })
      .then((res) => {
        console.log(res.data);
        toast.success("Product has been deleted!");
        setTimeout(() => {
          this.props.history.push("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <div className="descriptionUl"></div>
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
                                      product.images && product.images[0].image
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
      </div>
    );
  }
}

export default ProductDetail;
