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

import {productListURL} from "../store/constants";

class HomepageLayout extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        axios.get(productListURL).then(res => {
            this.setState({products: res.data})
        })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {products} = this.state;
        return (
            <Container>
                <CarouselProvider
                    naturalSlideWidth={110}
                    naturalSlideHeight={50}
                    totalSlides={3}
                    isPlaying={true}
                    interval={3000}
                >
                    <Slider>
                        <Slide index={1}><img
                            style={{'objectFit': 'cover', 'height': '100%', 'width': '100%'}}
                            src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                            alt="First slide"/></Slide>
                        }
                        <Slide index={2}><img
                            style={{'objectFit': 'cover', 'height': '100%', 'width': '100%'}}
                            src='https://bd.gaadicdn.com/processedimages/revolt-motors/rv-400/source/m_rv-400_11560855440.jpg?tr=w-360'
                            alt="First slide"/></Slide>
                        }
                        <Slide index={3}><img
                            style={{'objectFit': 'cover', 'height': '100%', 'width': '100%'}}
                            src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                            alt="First slide"/></Slide>
                        }
                    </Slider>
                </CarouselProvider>

                <Grid style={{marginTop: '100px'}} container columns={3}>
                    {
                        products.map(product => {
                            return(
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

export default HomepageLayout;
