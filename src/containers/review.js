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
import {postLikeURL, postsListURL, URL} from "../store/constants";
import Loader from 'react-loader-spinner'

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {logout} from "../store/actions/auth";
import {connect} from "react-redux";


class Review extends React.Component {
    state = {
        posts: [],
        loading: false,
        limit: 6,
        offset: 0,
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
                this.fetchPosts()
            }
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillMount() {
        this.fetchPosts()
    }

    fetchPosts = () => {
        const {limit, offset, posts} = this.state;
        const token = localStorage.getItem('token')
        let headers;
        if (token) {
            headers = {
                Authorization: `Token ${token}`
            };
        } else {
            headers = {}
        }
        this.setState({loading: true})
        axios.get(postsListURL(limit, offset), {headers: headers}).then(res => {
            this.setState({
                posts: [...posts, ...res.data.posts],
                loading: false,
                has_more: res.data.has_more,
                offset: limit + offset
            })
        })
            .catch(err => {
                console.log(err)
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
        if (!this.props.authenticated) {
            toast.error("You are not logged in!")
        } else {

            let headers = {
                Authorization: `Token ${localStorage.getItem('token')}`
            };
            this.setState({action: value}, () => {
                axios.post(postLikeURL, {"post_id": id, "action": this.state.action}, {headers: headers})
                    .then(res => {
                        console.log(res.data)
                        const elementsIndex = this.state.posts.findIndex(element => element.id == res.data.id)
                        let newArray = [...this.state.posts]
                        newArray[elementsIndex] = {
                            ...newArray[elementsIndex],
                            is_like: res.data.is_like,
                            likes_count: res.data.likes_count
                        }
                        this.setState({posts: newArray})
                    })
            })
        }
    };

    render() {
        const {posts, loading, has_more} = this.state;
        return (
            <div className="container">
                <ToastContainer position="bottom-right"/>

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
                {/*{*/}
                {/*    loading ? <Loader*/}
                {/*        style={{marginTop: "100px", textAlign: 'center'}}*/}
                {/*        type="Rings"*/}
                {/*        color="red"*/}
                {/*        height={100}*/}
                {/*        width={100}*/}
                {/*    /> : ''*/}
                {/*}*/}
                <div className="row" style={{marginTop: "100px"}}>
                    {
                        posts.map(post => {
                            return (
                                <div className="col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <Link to={`/post/${post.id}`} style={{decoration: 'none'}}>
                                            <img style={{
                                                height: '232px',
                                                objectFit: 'cover'
                                            }}
                                                 src={`${post.image}`}
                                                 alt=""/>
                                        </Link>
                                        <div className="down-content">
                                            <a href="car-details.html"><h5 style={{marginBottom: "5px"}}>
                                                <Link style={{color: 'black'}} to={`/post/${post.id}`}>
                                                    {post.description}
                                                </Link>
                                            </h5></a>
                                            <strong><i>Author:</i>
                                                <Link to={`/profile/${post.user}`}>
                                                    {post.user}
                                                </Link>
                                            </strong>
                                            <br/>
                                            <br/>
                                            <Grid columns={2}>
                                                <Grid.Column style={{color: "red"}}>
                                                    {
                                                        post.is_like && post.is_like ?
                                                            <Icon onClick={() => this.likes(post.id)}
                                                                  name='heart' size="large"/>
                                                            :
                                                            <Icon size="large" onClick={() => this.likes(post.id)}
                                                                  name='heart outline'/>

                                                    }
                                                    {post.likes_count} likes
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Icon name='comments'/>
                                                    {post.comments_counts} comments
                                                </Grid.Column>
                                            </Grid>
                                            {/*<h6><small>*/}
                                            {/*    <del> ₹ {product.price}</del>*/}
                                            {/*</small> ₹ {product.price}*/}
                                            {/*</h6>*/}

                                            {/*<p>190 hp &nbsp;/&nbsp; Petrol &nbsp;/&nbsp; 2008 &nbsp;/&nbsp; Used*/}
                                            {/*    vehicle</p>*/}

                                            {/*<small>*/}
                                            {/*    <strong title="Author"><i className="fa fa-dashboard"></i>*/}
                                            {/*        {product.km}km*/}
                                            {/*    </strong> &nbsp;&nbsp;&nbsp;&nbsp;*/}
                                            {/*    <strong title="Author"><i*/}
                                            {/*        className="fa fa-cube"></i> {product.color}*/}
                                            {/*    </strong>&nbsp;&nbsp;&nbsp;&nbsp;*/}
                                            {/*    <strong title="Views"><i*/}
                                            {/*        className="fa fa-cog"></i> Manual</strong>*/}
                                            {/*</small>*/}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div style={{textAlign: "center", marginTop: "50px"}}>
                    {
                        loading ? <Loader
                            style={{marginTop: "100px", textAlign: 'center', height: '100vh'}}
                            type="Rings"
                            color="red"
                            height={100}
                            width={100}
                        /> : ''
                    }
                    {
                        !has_more ? "No more posts" : ''
                    }
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
    )(Review)
);
