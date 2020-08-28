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
import {postsListURL} from "../store/constants";


class Review extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        let headers;
        if (token){
            headers = {
                Authorization: `Token ${token}`
            };
        } else {
            headers = {}
        }
        axios.get(postsListURL, {headers:headers}).then(res => {
            this.setState({posts: res.data})
        })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {posts} = this.state;
        return (
            <div className="container" >
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
                <div className="row" style={{marginTop:"100px"}}>
                    {
                        posts.map(post => {
                            return (
                                <div className="col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <Link to={`/post/${post.id}`} style={{decoration:'none'}}>
                                            <img
                                            src={`${post.image}`}
                                            alt=""/>
                                        </Link>
                                        <div className="down-content">
                                            <a href="car-details.html"><h4>
                                                <Link to={`/post/${post.id}`}>
                                                    {post.description}
                                                </Link>
                                            </h4></a>
                                            <Grid columns={2}>
                                                <Grid.Column>
                                                    <Icon name='heart outline'/>
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
