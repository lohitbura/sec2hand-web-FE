import React from 'react';
import {Container} from "semantic-ui-react";
import {Button, Checkbox, Form, TextArea} from 'semantic-ui-react'
import axios from "axios";
import {productCreateURL, productDetailURL} from "../store/constants";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import {Link, withRouter} from "react-router-dom";


class ProductEdit extends React.Component {
    state = {
        price: '',
        model: '',
        image: '',
        km: '',
        color: '',
        loader: false,
        message: '',
        error: ''
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        const {id} = this.props.match.params;

        axios.get(productDetailURL(id)).then(res => {
            this.setState({
                price: res.data.price,
                model: res.data.model,
                km: res.data.km,
                color: res.data.color,
            })
        })
            .catch(err => {
                console.log(err)
            })
    }

    submit = () => {
        const {price, model, image, km, color} = this.state;
        const {id} = this.props.match.params;

        let form_data = new FormData();
        form_data.append('price', price);
        form_data.append('model', model);
        if (image) {
            form_data.append('image', image, image.name);

        }
        form_data.append('km', km);
        form_data.append('color', color);
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        this.setState({loader: true})
        axios.put(productDetailURL(id), form_data, {headers: headers}).then(res => {
            console.log(res.data)
            this.setState({loader: false, message: res.data.message})
        })
            .catch(err => {
                console.log(err)
                this.setState({loader: false, error: err.data})
            })
    };

    handleChange = (e) => {
        this.setState(({[e.target.name]: e.target.value}))
    };

    handleImage = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    render() {
        const {loader, error, message, price, model, km, color, image} = this.state;
        if (loader) {
            return (
                <Loader active inline='centered'/>
            )
        }
        return (
            <Container style={{'width': '40%'}}>
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
                    error ? <Message color='red'>Failed to create Product</Message> : ''
                }
                {
                    message ?
                        <Message color='green'>Product create successful!</Message> : ''
                }
                <Form style={{marginTop: "100px"}} onSubmit={this.submit}>
                    <Form.Field>
                        <label>Model</label>
                        <input value={model} name='model' onChange={this.handleChange} placeholder='Model' required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <TextArea value={price} name='price' onChange={this.handleChange} placeholder='Price' required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Km</label>
                        <input value={km} name='km' onChange={this.handleChange} placeholder='km' required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Color</label>
                        <input value={color} name='color' onChange={this.handleChange} placeholder='Color' required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Image</label>
                        <input type='file' name='image' onChange={this.handleImage}/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        )
    }
}

export default ProductEdit;