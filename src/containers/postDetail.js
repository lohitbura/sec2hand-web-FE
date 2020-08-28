import React from 'react';
import {CarouselProvider, Slide, Slider} from "pure-react-carousel";
import {Link, withRouter} from "react-router-dom";
import {Container, Comment, Form, Button} from "semantic-ui-react";
import axios from 'axios';
import {getUserProfileIdURL, postCommentURl, postDetailURL, postLikeURL, productDetailURL} from "../store/constants";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import {logout} from "../store/actions/auth";
import {connect} from "react-redux";

class PostDetail extends React.Component {
    state = {
        post: {},
        username: ''
    }

    componentDidMount() {
        this.getPostDetail()
        const token = localStorage.getItem('token')

        let header = {
            Authorization: `Token ${token}`
        };
        axios.get(getUserProfileIdURL, {headers: header}).then(res => {
            this.setState({username: res.data.user})
        })
    }

    getPostDetail = () => {
        const {id} = this.props.match.params;
        const token = localStorage.getItem('token')
        let headers;
        if (token) {
            headers = {
                Authorization: `Token ${token}`
            };
        } else {
            headers = {}
        }
        axios.get(postDetailURL(id), {headers: headers}).then(res => {
            this.setState({post: res.data})
        })
    }

    likes = () => {
        const {post} = this.state;

        if (post.is_like && post.is_like) {
            this.likesHandle("unlike")
        } else {
            this.likesHandle("like")
        }
    };

    likesHandle = (value) => {
        const id = this.state.post.id;
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        this.setState({action: value}, () => {
            axios.post(postLikeURL, {"post_id": id, "action": this.state.action}, {headers: headers})
                .then(res => {
                    this.setState({post: res.data})
                })
        })
    };

    commentSubmit = () => {
        const {post} = this.state;

        let data = {
            'comment': this.state.comment,
            'post': post.id
        };
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        axios.post(postCommentURl, data, {headers: headers}).then(res => {
            this.setState({comment: ""})
        })

        this.getPostDetail()
    };

    commentChange = (e) => {
        this.setState({comment: e.target.value})
    };

    postDelete = (id) => {
        axios.delete(postDetailURL(id)).then(res => {
            console.log(res.data)
            this.props.history.push('/review')
        })
            .catch(err => {
                console.log(err)
                this.setState({loader: false, error: err.data.message})
            })
    }

    render() {
        const {post, username} = this.state;
        // if (loading) {
        //     return <Loader active inline='centered'/>
        // }
        return (
            <div>
                <div className="page-heading about-heading header-text"
                     style={{'backgroundImage': `url(${post.image})`}}>
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

                <div className="products">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div>
                                    <img src={`${post.image}`} alt=""
                                         className="img-fluid wc-image"/>
                                </div>
                                <br/>
                            </div>

                            <div className="col-md-6">
                                <form action="#" method="post" className="form">
                                    <ul className="list-group list-group-flush">


                                        <strong className="pull-left"> Description</strong>

                                        <span className="pull-right">{post.description}</span>
                                        <br/>
                                        <strong><i>Author:</i>
                                            <Link to={`/profile/${post.user}`}>
                                                {post.user}
                                            </Link>
                                        </strong>
                                    </ul>
                                </form>
                                <br/>
                                {
                                    post.user === username ? <div>
                                        <Link to={`/postEdit/${post.id}`}>
                                            <Button content='Edit' color="green"/>
                                        </Link>
                                            <Button onClick={() => this.postDelete(post.id)} content='Delete' color="red"/>
                                    </div> : ''
                                }

                                <br/>
                                <br/>
                                {
                                    this.props.authenticated && this.props.authenticated ?
                                        post.is_like && post.is_like ?
                                            <div className="ui labeled button">
                                                <button className="ui red button" tabIndex="0" onClick={this.likes}>
                                                    <i aria-hidden="true" className="heart icon"/>
                                                    Unlike
                                                </button>
                                                <div
                                                    className="ui red left pointing basic label">{post.likes_count}</div>
                                            </div>
                                            :
                                            <div className="ui labeled button">
                                                <button className="ui red button" tabIndex="0" onClick={this.likes}>
                                                    <i aria-hidden="true" className="heart icon"/>
                                                    Like
                                                </button>
                                                <div
                                                    className="ui red left pointing basic label">{post.likes_count}</div>
                                            </div>
                                        : ''
                                }


                                <Comment.Group>
                                    <Header as='h3'>
                                        Comments({post.comments && post.comments.length})
                                    </Header>
                                    {
                                        this.props.authenticated && this.props.authenticated ?
                                            <Form onSubmit={this.commentSubmit}>
                                                <Form.TextArea onChange={this.commentChange}
                                                               value={this.state.comment}/>
                                                <Button content='Add comment' secondary/>
                                            </Form> : ''
                                    }

                                    {post.comments && post.comments.map(comment => {
                                        return (
                                            <Comment key={comment.id}>
                                                {/*<Comment.Avatar src={`${URL}/media/${comment.profile_pic}`}/>*/}
                                                <Comment.Content>
                                                    <Comment.Author as='a'>
                                                        <Link to={`/profile/${comment.user}`}>
                                                            {comment.user}
                                                        </Link>
                                                    </Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>Today at 5:42PM</div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>{comment.comment}</Comment.Text>
                                                </Comment.Content>
                                            </Comment>
                                        )
                                    })}
                                </Comment.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // <Container>
            //     <CarouselProvider
            //         naturalSlideWidth={110}
            //         naturalSlideHeight={50}
            //         totalSlides={1}
            //         isPlaying={true}
            //         interval={3000}
            //     >
            //         <Slider>
            //             <Slide index={1}>
            //                 <img
            //                     style={{'objectFit': 'cover', 'height': '100%', 'width': '100%'}}
            //                     src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
            //                     alt="First slide"/></Slide>
            //             }
            //         </Slider>
            //     </CarouselProvider>
            //
            //     <h2><Link to={`/profile/${post.user}`}>
            //         Dealer: {post.user}
            //     </Link></h2>
            //     <p style={{fontSize: "18px"}}>Description: {post.description}</p>
            //     <hr/>
            //     {
            //         this.props.authenticated && this.props.authenticated ?
            //             post.is_like && post.is_like ?
            //                 <div className="ui labeled button">
            //                     <button className="ui red button" tabIndex="0" onClick={this.likes}>
            //                         <i aria-hidden="true" className="heart icon"/>
            //                         Unlike
            //                     </button>
            //                     <div className="ui red left pointing basic label">{post.likes_count}</div>
            //                 </div>
            //                 :
            //                 <div className="ui labeled button">
            //                     <button className="ui red button" tabIndex="0" onClick={this.likes}>
            //                         <i aria-hidden="true" className="heart icon"/>
            //                         Like
            //                     </button>
            //                     <div className="ui red left pointing basic label">{post.likes_count}</div>
            //                 </div>
            //             : ''
            //     }
            //
            //     <Comment.Group>
            //         <Header as='h3'>
            //             Comments({post.comments && post.comments.length})
            //         </Header>
            //         {
            //             this.props.authenticated && this.props.authenticated ? <Form onSubmit={this.commentSubmit}>
            //                 <Form.TextArea onChange={this.commentChange} value={this.state.comment}/>
            //                 <Button content='Add comment' secondary/>
            //             </Form> : ''
            //         }
            //
            //         {post.comments && post.comments.map(comment => {
            //             return (
            //                 <Comment key={comment.id}>
            //                     <Comment.Avatar src={`${URL}/media/${comment.profile_pic}`}/>
            //                     <Comment.Content>
            //                         <Comment.Author as='a'>
            //                             <Link to={`/profile/${comment.user}`}>
            //                                 {comment.user}
            //                             </Link>
            //                         </Comment.Author>
            //                         <Comment.Metadata>
            //                             <div>Today at 5:42PM</div>
            //                         </Comment.Metadata>
            //                         <Comment.Text>{comment.comment}</Comment.Text>
            //                     </Comment.Content>
            //                 </Comment>
            //             )
            //         })}
            //
            //     </Comment.Group>
            //
            // </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
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
    )(PostDetail)
);