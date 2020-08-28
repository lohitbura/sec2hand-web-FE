import React from 'react';
import {Container} from "semantic-ui-react";
import {Button, Checkbox, Form, TextArea} from 'semantic-ui-react'
import axios from "axios";
import {postCreateURL, postDetailURL, productCreateURL, productDetailURL} from "../store/constants";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";


class PostEdit extends React.Component {
    state = {
        image: '',
        description: '',
        loader: false,
        message: '',
        error: ''
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        const {id} = this.props.match.params;

        axios.get(postDetailURL(id)).then(res => {
            this.setState({description: res.data.description})
        })
            .catch(err => {
                console.log(err)
            })
    }

    submit = () => {
        const {id} = this.props.match.params;
        const {description, image} = this.state;
        let form_data = new FormData();
        if(image){
            form_data.append('image', image, image.name);
        }
        form_data.append('description', description);
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        this.setState({loader: true})
        axios.put(postDetailURL(id), form_data, {headers: headers}).then(res => {
            console.log(res.data)
            this.setState({loader: false, message: res.data.message})
            this.props.history.goBack()
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
        const {loader, error, message, description} = this.state;
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
                    error ? <Message color='red'>Failed to create Post</Message> : ''
                }
                {
                    message ?
                        <Message color='green'>Post create successful!</Message> : ''
                }
                <Form style={{marginTop: "100px"}} onSubmit={this.submit}>
                    <Form.Field>
                        <label>Description</label>
                        <TextArea value={description} name='description' onChange={this.handleChange} placeholder='Description' required/>
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

export default PostEdit;