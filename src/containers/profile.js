import React from 'react';
import {Comment, Container, Form, Icon} from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import Tab from "semantic-ui-react/dist/commonjs/modules/Tab";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import axios from "axios";
import {getUserProfileIdURL, getUserProfileURL, postLikeURL, URL} from "../store/constants";
import {Link, withRouter} from "react-router-dom";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Pagination from "semantic-ui-react/dist/commonjs/addons/Pagination";
import Loader from 'react-loader-spinner';


class Profile extends React.Component {
    state = {
        profile: {},
        loader: false,
        message: '',
        username: '',
        posts: []
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.fetchProfile()
        const token = localStorage.getItem('token')

        let header = {
            Authorization: `Token ${token}`
        };

        axios.get(getUserProfileIdURL, {headers: header}).then(res => {
            this.setState({username: res.data.user})
        })
    }

    fetchProfile = () => {
        const {username} = this.props.match.params;
        const token = localStorage.getItem('token')
        let headers;
        if (token) {
            headers = {
                Authorization: `Token ${token}`
            };
        } else {
            headers = {}
        }
        this.setState({loader: true})
        axios.get(getUserProfileURL(username), {headers: headers}).then(res => {
            this.setState({loader: false, profile: res.data, posts: res.data.posts})
        })
            .catch(err => {
                console.log(err)
                this.setState({loader: false})
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

    render() {
        const {profile, username, loader} = this.state;
        const panes = [
            {
                menuItem: 'Products',
                render: () => <Tab.Pane>
                    {
                        profile.user === username ? <Link to="/product-create">
                            <Button style={{marginBottom: "50px"}} color="red">Create product</Button>
                        </Link> : ''
                    }

                    <div className="container">
                        <div className="row">
                            {
                                profile.products && profile.products.map(product => {
                                    return (
                                        <div className="col-lg-4 col-md-6">
                                            <div className="product-item">
                                                <Link to={`/product/${product.id}`}>
                                                    <img style={{
                                                        height: '232px',
                                                        objectFit: 'cover'
                                                    }}
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
                        <div style={{textAlign: "center"}}>
                            {/*<Pagination*/}
                            {/*    boundaryRange={0}*/}
                            {/*    defaultActivePage={1}*/}
                            {/*    ellipsisItem={null}*/}
                            {/*    firstItem={null}*/}
                            {/*    lastItem={null}*/}
                            {/*    siblingRange={1}*/}
                            {/*    totalPages={10}*/}
                            {/*/>*/}
                        </div>
                    </div>
                </Tab.Pane>,
            },
            {
                menuItem: 'Posts', render: () => <Tab.Pane>
                    {
                        profile.user === username ? <Link to="/post-create">
                            <Button style={{marginBottom: "50px"}} color="red">Create post</Button>
                        </Link> : ''
                    }

                    <Container>
                        <div className="row">
                            {
                                profile.posts && profile.posts.map(post => {
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
                                                                    <Icon size="large"
                                                                          onClick={() => this.likes(post.id)}
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
                        <div style={{textAlign: "center"}}>
                            {/*<Pagination*/}
                            {/*    boundaryRange={0}*/}
                            {/*    defaultActivePage={1}*/}
                            {/*    ellipsisItem={null}*/}
                            {/*    firstItem={null}*/}
                            {/*    lastItem={null}*/}
                            {/*    siblingRange={1}*/}
                            {/*    totalPages={10}*/}
                            {/*/>*/}
                        </div>
                    </Container>
                </Tab.Pane>
            },
        ]
        return (
            <Container>
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
                    {
                        loader ? <Loader
                                style={{marginTop: "100px", textAlign: 'center', height: '100vh'}}
                                type="Rings"
                                color="red"
                                height={100}
                                width={100}
                            /> :

                            <div className="products">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div>
                                                {
                                                    profile.image ? <img src={`${profile.image}`} alt=""
                                                                         className="img-fluid wc-image"/> :
                                                        <img src="/assets/images/profile-placeholder.png" alt=""
                                                             className="img-fluid wc-image"/>
                                                }
                                            </div>
                                            <br/>
                                        </div>

                                        <div className="col-md-6">
                                            <form action="#" method="post" className="form">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <div className="clearfix">
                                                            <span className="pull-left"> Username</span>

                                                            <strong className="pull-right">{profile.user}</strong>
                                                        </div>
                                                    </li>
                                                    {
                                                        profile.is_dealer ? <li className="list-group-item">
                                                            <div className="clearfix">
                                                                <span className="pull-left"> Shop code</span>

                                                                <strong className="pull-right">{profile.code}</strong>
                                                            </div>
                                                        </li> : ''
                                                    }

                                                    {
                                                        profile.is_dealer ? <li className="list-group-item">
                                                            <div className="clearfix">
                                                                <span className="pull-left"> Address</span>

                                                                <strong
                                                                    className="pull-right">{profile.address}</strong>
                                                            </div>
                                                        </li> : ''
                                                    }

                                                    <li className="list-group-item">
                                                        <div className="clearfix">
                                                            <span className="pull-left"> Phone</span>

                                                            <strong className="pull-right">{profile.phone}</strong>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <div className="clearfix">
                                                            <span className="pull-left"> City</span>

                                                            <strong className="pull-right">{profile.city}</strong>
                                                        </div>
                                                    </li>
                                                    {
                                                        profile.is_dealer ? <li className="list-group-item">
                                                            <div className="clearfix">
                                                                <span className="pull-left"> Area</span>

                                                                <strong className="pull-right">{profile.area}</strong>
                                                            </div>
                                                        </li> : ''
                                                    }
                                                </ul>
                                                <br/>
                                                {
                                                    profile.user === username ? <Link to="/profile-edit">
                                                        <Button content='Edit' color="red"/>
                                                    </Link> : ''
                                                }

                                            </form>
                                            <br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
                {/*<Grid columns={3}>*/}
                {/*    <Grid.Column>*/}
                {/*        <Image style={{margin: "auto", height: "300px", objectFit: 'cover'}}*/}
                {/*               src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'*/}
                {/*               size='medium' circular/>*/}
                {/*        <h2 style={{textAlign: "center"}}>{profile.shop_name}</h2>*/}
                {/*    </Grid.Column>*/}
                {/*    <Grid.Column style={{marginTop: "20px"}}>*/}
                {/*        <h3>Code: {profile.code}</h3>*/}
                {/*        <h3>Username: {profile.user}</h3>*/}
                {/*        <p style={{fontSize: "18px"}}>Address: {profile.address}</p>*/}
                {/*        <p style={{fontSize: "18px"}}>Phone: {profile.phone}</p>*/}
                {/*        <p style={{fontSize: "18px"}}>City: {profile.city}</p>*/}
                {/*        <p style={{fontSize: "18px"}}>Area: {profile.area}</p>*/}
                {/*        <p style={{fontSize: "18px"}}>Category: {profile.category}</p>*/}
                {/*        <Link to="/profile-edit">*/}
                {/*            <Button content='Edit' primary/>*/}
                {/*        </Link>*/}
                {/*    </Grid.Column>*/}
                {/*</Grid>*/}
                {
                    profile.is_dealer ? (
                        loader ? '' : <Tab style={{marginTop: "50px"}} panes={panes}/>) : ''
                }
            </Container>
        )

    }
}

export default Profile;