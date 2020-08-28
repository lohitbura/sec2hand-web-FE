import React from 'react';
import {Container} from "semantic-ui-react";
import {Button, Checkbox, Form, TextArea} from 'semantic-ui-react'
import axios from "axios";
import {
    customerProfileEditURL,
    dealerProfileEditURL,
    getUserProfileIdURL,
    getUserProfileURL,
    postCreateURL,
    productCreateURL
} from "../store/constants";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import {logout} from "../store/actions/auth";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


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
        error: '',
        username: '',
        is_dealer: false
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.token !== this.props.token) {
            let headers = {
                Authorization: `Token ${localStorage.getItem('token')}`
            };
            axios.get(getUserProfileIdURL, {headers: headers}).then(res => {
                this.setState({username: res.data.user})
            })
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const {username} = this.state;
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        this.setState({loader: true})
        axios.get(getUserProfileURL(username), {headers: headers}).then(res => {
            console.log(res.data)
            this.setState({
                loader: false,
                address: res.data.address,
                phone: res.data.phone,
                city: res.data.city,
                area: res.data.area,
                category: res.data.category,
                is_dealer: res.data.is_dealer
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
            image,
            is_dealer
        } = this.state;
        let form_data = new FormData();
        if (is_dealer) {

            if (image) {
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
        } else {
            if (image) {
                form_data.append('image', image, image.name);
            }
            form_data.append('phone', phone);
            form_data.append('city', city);
            let headers = {
                Authorization: `Token ${localStorage.getItem('token')}`
            };
            this.setState({loader: true})
            axios.post(customerProfileEditURL, form_data, {headers: headers}).then(res => {
                console.log(res.data)
                this.setState({loader: false, message: res.data.message})
            })
                .catch(err => {
                    console.log(err)
                    this.setState({loader: false, error: err.data.message})
                })
        }

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
            category,
            is_dealer
        } = this.state;
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
                        <Message color='green'>Profile updated successful!</Message> : ''
                }
                <Form style={{marginTop: "100px"}} onSubmit={this.submit}>
                    {
                        is_dealer ? <Form.Field>
                            <label>Address</label>
                            <TextArea value={address} name='address' onChange={this.handleChange} placeholder='Address'
                                      required/>
                        </Form.Field> : ''
                    }

                    <Form.Field>
                        <label>Phone</label>
                        <Input value={phone} name='phone' onChange={this.handleChange} placeholder='Phone' required/>
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <Input value={city} name='city' onChange={this.handleChange} placeholder='city' required/>
                    </Form.Field>
                    {
                        is_dealer ? <Form.Field>
                            <label>Area</label>
                            <Input value={area} name='area' onChange={this.handleChange} placeholder='Area' required/>
                        </Form.Field> : ''
                    }

                    {
                        is_dealer ? <Form.Field>
                            <label>Category</label>
                            <Input value={category} name='category' onChange={this.handleChange} placeholder='Category'
                                   required/>
                        </Form.Field> : ''
                    }
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

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditProfile)
);