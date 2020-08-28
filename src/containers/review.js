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
import {postLikeURL, postsListURL} from "../store/constants";
import Loader from 'react-loader-spinner'


class Review extends React.Component {
    state = {
        posts: [],
        loading: false
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.fetchPosts()
    }

    fetchPosts = () => {
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
        axios.get(postsListURL, {headers: headers}).then(res => {
            this.setState({posts: res.data, loading: false})
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
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        this.setState({action: value}, () => {
            axios.post(postLikeURL, {"post_id": id, "action": this.state.action}, {headers: headers})
                .then(res => {
                    this.setState({post: res.data})
                    this.fetchPosts()
                })
        })
    };

    render() {
        const {posts, loading} = this.state;
        return (
            <div className="container">
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
                {
                    loading ? <Loader
                        style={{marginTop:"100px", textAlign:'center'}}
                        type="Rings"
                        color="red"
                        height={100}
                        width={100}
                    /> : ''
                }
                <div className="row" style={{marginTop: "100px"}}>

                    {
                        posts.map(post => {
                            return (
                                <div className="col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <Link to={`/post/${post.id}`} style={{decoration: 'none'}}>
                                            <img
                                                src={`${post.image}`}
                                                alt=""/>
                                        </Link>
                                        <div className="down-content">
                                            <a href="car-details.html"><h5 style={{marginBottom:"5px"}}>
                                                <Link style={{color:'black'}} to={`/post/${post.id}`}>
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
                                                <Grid.Column style={{color:"red"}}>
                                                    {
                                                        post.is_like && post.is_like ?
                                                            <Icon onClick={() => this.likes(post.id)}
                                                                  name='heart' size="large"/>
                                                            :
                                                            <Icon size="large" onClick={() => this.likes(post.id)} name='heart outline'/>

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
                    <Pagination
                        boundaryRange={0}
                        defaultActivePage={1}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        totalPages={10}
                    />
                </div>
            </div>
        )
    }
}

export default Review;
