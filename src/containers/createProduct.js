import React from 'react';
import {Container} from "semantic-ui-react";
import {Button, Checkbox, Form, TextArea} from 'semantic-ui-react'
import axios from "axios";
import {bikeCreateURL, brandListURL, carCreateURL, mobileCreateURL, productCreateURL} from "../store/constants";
import Loader from 'react-loader-spinner';
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import {Link, withRouter} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateProduct extends React.Component {
    state = {
        price: '',
        brand: '',
        model: '',
        image: [],
        km: '',
        color: '',
        loader: false,
        message: '',
        error: '',
        type: 'scooter',
        fuel_type: 'petrol',
        year: '',
        brandList: [],
        modelList: []
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        this.fetchBrand()
    }

    fetchBrand = () => {
        let category = localStorage.getItem("category")
        let productCategory = ''
        const {type, brand} = this.state;
        console.log(brand)
        if (category == "bike") {
            if (type == "scooter") {
                productCategory = "Scooters"
            }
            if (type == "motorcycle") {
                productCategory = "Bikes"
            }
        } else {
            if (category == "car") {
                productCategory = "Car"
            }
            if (category == "mobile") {
                productCategory = "Mobile"
            }
        }
        if (brand !== '') {
            axios.post(brandListURL, {type: productCategory, brand_name: brand}).then(res => [
                this.setState({
                    modelList: res.data
                })
            ])
        } else {
            axios.post(brandListURL, {type: productCategory}).then(res => [
                this.setState({
                    brandList: res.data
                })
            ])
        }
    }

    createProduct = (url, category) => {
        const {price, model, images, km, color, fuel_type, type, year, brand} = this.state;

        if (images.length > 10) {
            return toast.error("You can not select more 10 images")
        }
        let form_data = new FormData();
        form_data.append('price', price);
        form_data.append('brand', brand);
        form_data.append('model', model);
        form_data.append('color', color);
        form_data.append('year', year);
        if (category === "car") {
            form_data.append('fuel_type', fuel_type);
            form_data.append('km', km);
        } else if (category === "bike") {
            form_data.append('type', type);
            form_data.append('km', km);
        }

        for (let i = 0; i < images.length; i++) {
            form_data.append('images', images[i])
        }

        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        this.setState({loader: true})
        axios.post(url, form_data, {headers: headers}).then(res => {
            this.setState({loader: false, message: res.data.message})
            toast.success("Product create successful!")
            setTimeout(() => {
                this.props.history.goBack()
            }, 1000)
        })
            .catch(err => {
                this.setState({loader: false, error: err.data.message})
                toast.error("Product create failed!")
            })
    }

    submit = () => {
        const category = localStorage.getItem('category')
        if (category === "car") {
            this.createProduct(carCreateURL, category)
        } else if (category === "mobile") {
            this.createProduct(mobileCreateURL, category)
        } else {
            this.createProduct(bikeCreateURL, category)
        }
    };

    handleChange = (e) => {
        let name = e.target.name;
        if (name == "type") {
            this.setState({
                model: '',
                brand: ''
            })
        }
        this.setState(
            {[e.target.name]: e.target.value},
            () => {
                if (name == "type" || name == "brand") {
                    this.fetchBrand();
                }
            }
        )
    };

    handleImage = (e) => {
        const file = e.target.files;
        if (file.length > 10) {
            toast.error("You can not select more then 10 images")
        }
        let product_images = []
        for (let i = 0; i < file.length; i++) {
            product_images.push(e.target.files[i])
        }
        this.setState({
            images: e.target.files
        })
    };

    render() {
        const {loader, error, message} = this.state;
        const category = localStorage.getItem('category')
        return (
            <Container style={{'width': '40%', height: "100vh"}}>
                <ToastContainer position="bottom-right"/>
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
                        /> :
                        <Form enctype="multipart/form-data" style={{marginTop: "100px"}} onSubmit={this.submit}>
                            {
                                category === "bike" ? <Form.Field>
                                    <label>Vehicle Type</label>
                                    <select onChange={this.handleChange} name="type"
                                            className="form-control">
                                        <option value="scooter">Scooter</option>
                                        <option value="motorcycle">Motorcycle</option>
                                    </select>
                                </Form.Field> : ''
                            }
                            <Form.Field>
                                <label>Brand</label>
                                <select onChange={this.handleChange} name="brand"
                                        className="form-control">
                                    <option>Select Brand</option>

                                    {
                                        this.state.brandList && this.state.brandList.map(city => {
                                            return <option value={city.Brand}>{city.Brand}</option>
                                        })
                                    }
                                </select>
                            </Form.Field>
                            <Form.Field>

                                <label>Model</label>
                                <select onChange={this.handleChange} name="model"
                                        className="form-control">
                                    <option>Select Model</option>

                                    {
                                        this.state.modelList && this.state.modelList.map(city => {
                                            return <option value={city.Model}>{city.Model}</option>
                                        })
                                    }
                                </select>
                            </Form.Field>

                            <Form.Field>
                                <label>Price</label>
                                <input type="number" name='price' onChange={this.handleChange} placeholder='Price'
                                       required/>
                            </Form.Field>
                            <Form.Field>
                                <label>Year</label>
                                <input type="number" name='year' onChange={this.handleChange} placeholder='Year'
                                       required/>
                            </Form.Field>
                            {
                                category !== "mobile" ? <Form.Field>
                                    <label>Km</label>
                                    <input name='km' onChange={this.handleChange} placeholder='km' required/>
                                </Form.Field> : ''
                            }
                            {
                                category === "car" ? <Form.Field>
                                    <label>Fuel type</label>
                                    <select onChange={this.handleChange} name="fuel_type"
                                            className="form-control">
                                        <option value="petrol">Petrol</option>
                                        <option value="diesel">Diesel</option>
                                    </select>
                                </Form.Field> : ''
                            }

                            <Form.Field>
                                <label>Color</label>
                                <input name='color' onChange={this.handleChange} placeholder='Color' required/>
                            </Form.Field>
                            <Form.Field>
                                <label>Image(limit upto 10 images)</label>
                                <input type='file' name='image' multiple onChange={this.handleImage} required/>
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Form>
                }
            </Container>
        )
    }
}

export default CreateProduct;