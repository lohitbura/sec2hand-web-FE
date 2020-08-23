import React from 'react';
import {Container, Icon} from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import Tab from "semantic-ui-react/dist/commonjs/modules/Tab";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import axios from "axios";
import {getUserProfileIdURL, getUserProfileURL} from "../store/constants";
import {Link, withRouter} from "react-router-dom";


class Profile extends React.Component {
    state = {
        profile: {},
        loader: false,
        message: '',
    }

    componentDidMount() {
        const {username} = this.props.match.params;
        this.setState({loader: true})
        axios.get(getUserProfileURL(username)).then(res => {
            this.setState({loader: false, profile: res.data})
        })
            .catch(err => {
                console.log(err)
                this.setState({loader: false})
            })
    }

    render() {
        const {profile} = this.state;
        const panes = [
            {
                menuItem: 'Products',
                render: () => <Tab.Pane>
                    <Link to="/product-create">
                        <Button style={{marginBottom: "50px"}} primary>Create product</Button>
                    </Link>
                    <Grid container columns={3}>
                        {
                            profile.products && profile.products.map(product => {
                                return (
                                    <Grid.Column>
                                        <Card>
                                            <Image
                                                src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                                                wrapped ui={false}/>
                                            <Card.Content>
                                                <Card.Header>{product.model}</Card.Header>
                                                <Card.Meta>Joined in 2016</Card.Meta>
                                                <Card.Description>
                                                    ₹ {product.price}
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    </Grid.Column>
                                )
                            })
                        }
                    </Grid>
                </Tab.Pane>,
            },
            {
                menuItem: 'Posts', render: () => <Tab.Pane>
                    <Link to="/post-create">
                        <Button style={{marginBottom: "50px"}} primary>Create post</Button>
                    </Link>
                    <Grid container columns={3}>
                        {
                            profile.posts && profile.posts.map(post => {
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
                </Tab.Pane>
            },
        ]
        return (
            <Container>
                <Grid columns={3}>
                    <Grid.Column>
                        <Image style={{margin: "auto", height: "300px", objectFit: 'cover'}}
                               src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                               size='medium' circular/>
                        <h2 style={{textAlign: "center"}}>{profile.shop_name}</h2>
                    </Grid.Column>
                    <Grid.Column style={{marginTop: "20px"}}>
                        <h3>Code: {profile.code}</h3>
                        <h3>Username: {profile.user}</h3>
                        <p style={{fontSize: "18px"}}>Address: {profile.address}</p>
                        <p style={{fontSize: "18px"}}>Phone: {profile.phone}</p>
                        <p style={{fontSize: "18px"}}>City: {profile.city}</p>
                        <p style={{fontSize: "18px"}}>Area: {profile.area}</p>
                        <p style={{fontSize: "18px"}}>Category: {profile.category}</p>
                        <Link to="/profile-edit">
                            <Button content='Edit' primary/>
                        </Link>
                    </Grid.Column>
                </Grid>
                <Tab style={{marginTop: "50px"}} panes={panes}/>
            </Container>
        )

    }
}

export default Profile;