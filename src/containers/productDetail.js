import React from 'react';
import {Container} from "semantic-ui-react";
import {CarouselProvider, Slide, Slider} from "pure-react-carousel";
import {Link, withRouter} from "react-router-dom";
import axios from 'axios';
import {productDetailURL} from "../store/constants";


class ProductDetail extends React.Component {
    state = {
        product: {}
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        axios.get(productDetailURL(id)).then(res => {
            this.setState({product: res.data})
        })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {product} = this.state;
        return (
            <Container>
                <CarouselProvider
                    naturalSlideWidth={110}
                    naturalSlideHeight={50}
                    totalSlides={1}
                    isPlaying={true}
                    interval={3000}
                >
                    <Slider>
                        <Slide index={1}>
                            <img
                                style={{'objectFit': 'cover', 'height': '100%', 'width': '100%'}}
                                src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                                alt="First slide"/></Slide>
                        }
                    </Slider>
                </CarouselProvider>

                <h2><Link to={`/profile/${product.user}`}>
                    Dealer: {product.user}
                </Link></h2>
                <h2>Price: {product.price}</h2>
                <h2>Model: {product.model}</h2>
                <h2>Km: {product.km}</h2>
                <h2>Color: {product.color}</h2>
            </Container>
        )
    }
}

export default ProductDetail;
