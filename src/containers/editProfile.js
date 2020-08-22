import React from 'react';
import {Container} from "semantic-ui-react";
import {Button, Checkbox, Form, TextArea} from 'semantic-ui-react'
import axios from "axios";
import {dealerProfileEditURL, getUserProfileURL, postCreateURL, productCreateURL} from "../store/constants";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";


class EditProfile extends React.Component {
    state = {
        image: '',
        address: '',
        phone: '',
        city: '',
        area: '',
        category: '',
        loader: false,
        message: '',
        error: ''
    };

    componentDidMount() {
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        this.setState({loader: true})
        axios.get(getUserProfileURL, {headers: headers}).then(res => {
            console.log(res.data)
            this.setState({
                loader: false, address: res.data.address,
                phone: res.data.phone, city: res.data.city, area: res.data.area, category: res.data.category
            })
        })
            .catch(err => {
                console.log(err)
                this.setState({loader: false})
            })
    }

    submit = () => {
        const {
            address,
            phone,
            city,
            area,
            category,
            image
        } = this.state;
        let form_data = new FormData();
        if (image){
            form_data.append('image', image, image.name);
        }
        form_data.append('address', address);
        form_data.append('phone', phone);
        form_data.append('city', city);
        form_data.append('area', area);
        form_data.append('category', category);
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        this.setState({loader: true})
        axios.post(dealerProfileEditURL, form_data, {headers: headers}).then(res => {
            console.log(res.data)
            this.setState({loader: false, message: res.data.message})
        })
            .catch(err => {
                console.log(err)
                this.setState({loader: false, error: err.data.message})
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
        const {
            loader, error, message, address,
            phone,
            city,
            area,
            category
        } = this.state;
        if (loader) {
            return (
                <Loader active inline='centered'/>
            )
        }
        return (
            <Container style={{'width': '40%'}}>
                {
                    error ? <Message color='red'>Failed to create Post</Message> : ''
                }
                {
                    message ?
                        <Message color='green'>Profile updated successful!</Message> : ''
                }
                <Form onSubmit={this.submit}>
                    <Form.Field>
                        <label>Address</label>
                        <TextArea value={address} name='address' onChange={this.handleChange} placeholder='Address' required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Phone</label>
                        <Input value={phone} name='phone' onChange={this.handleChange} placeholder='Phone' required/>
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <Input value={city} name='city' onChange={this.handleChange} placeholder='city' required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Area</label>
                        <Input value={area} name='area' onChange={this.handleChange} placeholder='Area' required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Category</label>
                        <Input value={category} name='category' onChange={this.handleChange} placeholder='Category' required/>
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

export default EditProfile;