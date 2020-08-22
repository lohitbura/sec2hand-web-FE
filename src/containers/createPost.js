import React from 'react';
import {Container} from "semantic-ui-react";
import {Button, Checkbox, Form, TextArea} from 'semantic-ui-react'
import axios from "axios";
import {postCreateURL, productCreateURL} from "../store/constants";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";


class CreatePost extends React.Component {
    state = {
        image: '',
        description: '',
        loader: false,
        message: '',
        error: ''
    };

    componentDidMount() {
    }

    submit = () => {
        const {description, image} = this.state;
        let form_data = new FormData();
        form_data.append('image', image, image.name);
        form_data.append('description', description);
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        this.setState({loader: true})
        axios.post(postCreateURL, form_data, {headers: headers}).then(res => {
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
        const {loader, error, message} = this.state;
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
                        <Message color='green'>Post create successful!</Message> : ''
                }
                <Form onSubmit={this.submit}>
                    <Form.Field>
                        <label>Description</label>
                        <TextArea name='description' onChange={this.handleChange} placeholder='Description' required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Image</label>
                        <input type='file' name='image' onChange={this.handleImage} required/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        )
    }
}

export default CreatePost;