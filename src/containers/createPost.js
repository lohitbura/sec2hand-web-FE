import React from 'react';
import {Container} from "semantic-ui-react";
import {Button, Checkbox, Form, TextArea} from 'semantic-ui-react'
import axios from "axios";
import {postCreateURL, productCreateURL} from "../store/constants";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import Loader from 'react-loader-spinner';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class CreatePost extends React.Component {
    state = {
        image: '',
        description: '',
        loader: false,
        message: '',
        error: ''
    };

    componentDidMount() {
        window.scrollTo(0, 0);
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
            toast.success("Post create successful!")
        })
            .catch(err => {
                console.log(err)
                toast.error("Post create failed!")
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
        return (
            <Container style={{width: '40%', height:"100vh"}}>
                <ToastContainer position="bottom-right" />
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
                        style={{marginTop: "100px", textAlign: 'center'}}
                        type="Rings"
                        color="red"
                        height={100}
                        width={100}
                    /> : <Form style={{marginTop: "100px"}} onSubmit={this.submit}>
                        <Form.Field>
                            <label>Description</label>
                            <TextArea name='description' onChange={this.handleChange} placeholder='Description'
                                      required/>
                        </Form.Field>
                        <Form.Field>
                            <label>Image</label>
                            <input type='file' name='image' onChange={this.handleImage} required/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                }

            </Container>
        )
    }
}

export default CreatePost;