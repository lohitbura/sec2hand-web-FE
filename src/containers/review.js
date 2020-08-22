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
        axios.get(postsListURL).then(res => {
            this.setState({posts: res.data})
        })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {posts} = this.state;
        return (
            <Container>
                <Grid style={{marginTop: '50px'}} container columns={3}>
                    {
                        posts.map(post => {
                            return (
                                <Grid.Column>
                                    <Card>
                                        <Image
                                            src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                                            wrapped ui={false}/>
                                        <Card.Content>
                                            {/*<Card.Header>Daniel</Card.Header>*/}
                                            {/*<Card.Meta>Joined in 2016</Card.Meta>*/}
                                            <Card.Description>
                                                {post.description}
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content>
                                            <Grid columns={2}>
                                                <Grid.Column>
                                                    <Icon name='heart outline'/>
                                                    26 likes
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Icon name='comments'/>
                                                    50 comments
                                                </Grid.Column>
                                            </Grid>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            )
                        })
                    }

                </Grid>
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

            </Container>
        )
    }
}

export default Review;
