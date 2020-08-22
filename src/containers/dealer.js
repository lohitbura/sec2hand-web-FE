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
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import axios from 'axios';
import {dealerListURL} from "../store/constants";

class Dealer extends React.Component {
    state = {
        dealers: []
    }

    componentDidMount() {
        axios.post(dealerListURL, {}).then(res => {
            this.setState({dealers: res.data})
        })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {dealers} = this.state;
        const options = [
            {key: 1, text: 'Choice 1', value: 1},
            {key: 2, text: 'Choice 2', value: 2},
            {key: 3, text: 'Choice 3', value: 3},
        ]
        return (
            <Container>
                <Grid columns={2}>
                    <Grid.Column>
                        <Dropdown clearable options={options} selection placeholder='State'/>
                        <Dropdown clearable options={options} selection placeholder='City'/>
                        <Button secondary>Submit</Button> </Grid.Column>
                    <Grid.Column>
                        <Input focus placeholder='Search...'/>
                        <Button secondary>Search</Button>
                    </Grid.Column>
                </Grid>
                <Grid style={{marginTop: '50px'}} columns={3}>
                    {
                        dealers.map(dealer => {
                            return(
                                <Grid.Column>
                                    <Card>
                                        <Image
                                            src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                                            wrapped ui={false}/>
                                        <Card.Content>
                                            <Card.Header>{dealer.shop_name}</Card.Header>
                                            <Card.Meta>Joined in 2016</Card.Meta>
                                            <Card.Description>
                                                {dealer.city}
                                            </Card.Description>
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

export default Dealer;
