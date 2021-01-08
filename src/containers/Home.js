import PropTypes from "prop-types";
import React, {Component} from "react";
import { Carousel } from 'react-bootstrap';
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
import {Link, withRouter} from "react-router-dom";


import 'pure-react-carousel/dist/react-carousel.es.css';
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import Pagination from "semantic-ui-react/dist/commonjs/addons/Pagination";
import axios from 'axios';

import {dealerListURL, productListURL, URL} from "../store/constants";
// import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Loader from 'react-loader-spinner';
import {logout} from "../store/actions/auth";
import {connect} from "react-redux";
import {fetchCity} from "../store/actions/cityList";
import * as ImIcons from "react-icons/im";
import * as BiIcons from "react-icons/bi";

import 'react-toastify/dist/ReactToastify.css';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import RangeSlider from "./slider/Rangeslider";
import KmSlider from "./slider/KmSlider";
import YearSlider from "./slider/YearSlider";
import "./filter/filters.css";

class HomepageLayout extends React.Component {

    state = {
        products: [],
        dealers: [],
        loading: false,
        limit: 6,
        limit2: 6,
        limit1: 6,
        offset: 0,
        offset2: 0,
        offset1: 0,
        has_more: true,
        city: '',
        area: '',
        category: '',
        productCity: '',
        productType: 'car',
        filterbar:false
        
    }
    // constructor(props) {
    //     super(props)

    //         this.showFilterbar = this.showFilterbar.bind(this);
        
    //     this.state = {
    //         filterbar:false
    //     }
    // }

    componentDidMount() {
        this.loadProduct()
        this.props.fetchCityList();
    }

    showFilterbar=()=>{
        
        this.setState(currentState => ({
           filterbar: !currentState.filterbar
         }));
    }


    check = () => {
        if (!this.props.authenticated) {
            this.props.history.push('/login')
        }
    }

    onChange = (e) => {
        console.log(e.target.name + ":" + e.target.value)
        localStorage.setItem(e.target.name, e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }



    onSubmit = (e) => {
        e.preventDefault()
        const {dealers, city, area, category, limit1, offset1} = this.state;


        let form_data = new FormData();
        form_data.append('limit', limit1)
        form_data.append('offset', offset1)
        if (city) {
            form_data.append('city', city)
        }
        if (area) {
            form_data.append('area', area)
        }
        if (category) {
            form_data.append('category', category)
        }
        if (category && city && area) {
            form_data.append('category', category)
            form_data.append('area', area)
            form_data.append('city', city)
        }

        this.setState({loading: true})
        axios.post(dealerListURL, form_data).then(res => {
            if (offset1 === 0) {
                console.log(res.data.dealers)
                this.setState({
                    dealers: res.data.dealers,
                    loading: false,
                    has_more: res.data.has_more
                })
            } else {
                this.setState({
                    dealers: [...dealers, ...res.data.dealers],
                    loading: false,
                    offset: limit1 + offset1,
                    has_more: res.data.has_more
                })
            }

        })
            .catch(err => {
                console.log(err)
            })
    }

    loadDealers = () => {
        const {limit2, offset2, dealers} = this.state;
        this.setState({loading: true})
        axios.post(dealerListURL, {limit: limit2, offset: offset2}).then(res => {
            this.setState({
                dealers: [...dealers, ...res.data.dealers],
                loading: false,
                offset2: limit2 + offset2,
                has_more: res.data.has_more
            })
        })
            .catch(err => {
                console.log(err)
            })
    }

    fetchSearchDealers = () => {
        const {dealers, city, area, category, limit1, offset1} = this.state;


        let form_data = new FormData();
        form_data.append('limit', limit1)
        form_data.append('offset', offset1)
        if (city) {
            form_data.append('city', city)
        }
        if (area) {
            form_data.append('area', area)
        }
        if (category) {
            form_data.append('category', category)
        }
        if (category && city && area) {
            form_data.append('category', category)
            form_data.append('area', area)
            form_data.append('city', city)
        }

        this.setState({loading: true})
        axios.post(dealerListURL, form_data).then(res => {
            if (offset1 === 0) {
                console.log(res.data.dealers)
                this.setState({
                    dealers: res.data.dealers,
                    loading: false,
                    has_more: res.data.has_more
                })
            } else {
                this.setState({
                    dealers: [...dealers, ...res.data.dealers],
                    loading: false,
                    offset1: limit1 + offset1,
                    has_more: res.data.has_more
                })
            }

        })
            .catch(err => {
                console.log(err)
            })
    }

    productFilterSubmit = (e) => {
        e.preventDefault();
        const {limit, offset2, products, productType, productCity} = this.state;
        this.setState({loading: true})
        axios.get(productListURL(limit, offset2, productType, productCity)).then(res => {
            this.setState({
                products: res.data.products,
                loading: false,
                has_more: res.data.has_more
            })
            
            
        })
            .catch(err => {
                console.log(err)
            })

         
    }

    loadProduct = () => {
        const {limit, offset, products, productType, productCity} = this.state;
        this.setState({loading: true})
        axios.get(productListURL(limit, offset, productType, productCity)).then(res => {
            this.setState({
                products: [...products, ...res.data.products],
                loading: false,
                offset: limit + offset,
                has_more: res.data.has_more
            })
           
        })
        
            .catch(err => {
                console.log(err)
            })
    }

    onProductTypeChange = (e) => {
       
         this.setState({
            [e.target.name]: e.target.value
        })
    //    ***** here we get value of product type and show its brand******************
        this.productType=e.target.value
                        if ( this.productType=="car") {
                        this.brand= <div className="catagory mt-5">
                    
                        {/* <select onChange={this.onProductBrandChange} name="productBrand"
                                className="form-control">
                            <option value="Chevrolate">Chevrolate</option>
                            <option value="Datsun">Datsun</option>
                            <option value="Ford">Ford</option>
                            <option value="Hyundai">Hyundai</option>
                            <option value="Honda">Honda</option>
                            <option value="Jeep">Jeep</option>
                            <option value="KIA">KIA</option>
                            <option value="Mahindra">Mahindra</option>
                            <option value="Maruti Suzuki">Maruti Suzuki</option>
                            <option value="MG">MG</option>
                            <option value="Nissan">Nissan</option>
                            <option value="Renault">Renault</option>
                            <option value="Skoda">Skoda </option>
                            <option value="TATA">TATA</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Volkswagen">Volkswagen</option>
                            
                        </select> */}
                        <InputLabel id="label">Brands :</InputLabel>
                        <Select labelId="label" id="select"  onChange={this.onProductBrandChange} name="productBrand"
                                >
                            <MenuItem value="selectBrands">Select Brands</MenuItem>        
                            <MenuItem value="Chevrolate">Chevrolate</MenuItem>
                            <MenuItem value="Datsun">Datsun</MenuItem>
                            <MenuItem value="Ford">Ford</MenuItem>
                            <MenuItem value="Hyundai">Hyundai</MenuItem>
                            <MenuItem value="Honda">Honda</MenuItem>
                            <MenuItem value="Jeep">Jeep</MenuItem>
                            <MenuItem value="KIA">KIA</MenuItem>
                            <MenuItem value="Mahindra">Mahindra</MenuItem>
                            <MenuItem value="Maruti Suzuki">Maruti Suzuki</MenuItem>
                            <MenuItem value="MG">MG</MenuItem>
                            <MenuItem value="Nissan">Nissan</MenuItem>
                            <MenuItem value="Renault">Renault</MenuItem>
                            <MenuItem value="Skoda">Skoda </MenuItem>
                            <MenuItem value="TATA">TATA</MenuItem>
                            <MenuItem value="Toyota">Toyota</MenuItem>
                            <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                            
                            
                        </Select>
                    </div>
                    
                        }if ( this.productType==="mobile") {
                            this.brand= <div className="catagory mt-5">
                    
                        <InputLabel id="label">Brands :</InputLabel>
                        <Select labelId="label" id="select" onChange={this.onProductBrandChange} name="productBrand"
                               >
                            <MenuItem value="selectBrands">Select Brands</MenuItem>
                            <MenuItem value="Apple">Apple</MenuItem>
                            <MenuItem value="Asus">Asus</MenuItem>
                            <MenuItem value="Celkon">Celkon</MenuItem>
                            <MenuItem value="Coolpad">Coolpad</MenuItem>
                            <MenuItem value="Gionee">Gionee</MenuItem>
                            <MenuItem value="Google">Google</MenuItem>
                            <MenuItem value="HTC">HTC</MenuItem>
                            <MenuItem value="Honor">Honor</MenuItem>
                            <MenuItem value="Infinix">Infinix</MenuItem>
                                 <MenuItem value="Intex">Intex</MenuItem>
                                 <MenuItem value="Micromax">Micromax</MenuItem>
                                 <MenuItem value="MI">MI</MenuItem>
                                 <MenuItem value="Motorola">Motorola</MenuItem>
                                <MenuItem value="Nokia">Nokia</MenuItem>
                                 <MenuItem value="OnePlus">OnePlus</MenuItem>
                                 <MenuItem value="Oppo">Oppo</MenuItem>
                                 <MenuItem value="Realme">Realme</MenuItem>
                                 <MenuItem value="Samsung">Samsung</MenuItem>
                                   <MenuItem value="Vivo">Vivo</MenuItem>        
                            
                        </Select>
                    </div>
                        //     this.brand= <div className="catagory" >
                        //     <label>Brands:</label>
                        
                        //     <select onChange={this.onProductBrandChange} name="productBrand"
                        //             className="form-control">
                                
                        //         <option value="Apple">Apple</option>
                        //         <option value="Asus">Asus</option>
                        //         <option value="Celkon">Celkon</option>
                        //         <option value="Coolpad">Coolpad</option>
                        //         <option value="Gionee">Gionee</option>
                        //         <option value="Google">Google</option>
                        //         <option value="HTC">HTC</option>
                        //         <option value="Honor">Honor</option>
                        //         <option value="Infinix">Infinix</option>
                        //         <option value="Intex">Intex</option>
                        //         <option value="Micromax">Micromax</option>
                        //         <option value="MI">MI</option>
                        //         <option value="Motorola">Motorola</option>
                        //         <option value="Nokia">Nokia</option>
                        //         <option value="OnePlus">OnePlus</option>
                        //         <option value="Oppo">Oppo</option>
                        //         <option value="Realme">Realme</option>
                        //         <option value="Samsung">Samsung</option>
                        //         <option value="Vivo">Vivo</option>
                        //     </select>
                        // </div>
                    
                        }if ( this.productType==="motorcycle") {
                            this.brand= <div className="catagory mt-5">
                    
                            <InputLabel id="label">Brands :</InputLabel>
                            <Select labelId="label" id="select"  onChange={this.onProductBrandChange} name="productBrand"
                                    >
                                <MenuItem value="selectBrands">Select Brands</MenuItem>
                                <MenuItem value="Bajaj">Bajaj</MenuItem>
                                <MenuItem value="hero">Hero</MenuItem>
                                <MenuItem value="Honda">Honda</MenuItem>
                                <MenuItem value="Hero Honda">Hero Honda</MenuItem>
                                <MenuItem value="KTM">KTM</MenuItem>
                                <MenuItem value="Mahindra">Mahindra</MenuItem>
                                <MenuItem value="Royal Enfield">Royal Enfield</MenuItem>
                                <MenuItem value="Suzuki"> Suzuki</MenuItem>
                                <MenuItem value="TVS"> TVS</MenuItem>
                                <MenuItem value="Yamaha">Yamaha</MenuItem>
                                
                            </Select>
                        </div>

                        //     this.brand= <div>
                        //     <label>Brands:</label>
                        
                        //     <select onChange={this.onProductBrandChange} name="productBrand"
                        //             className="form-control">
                        //         <option value="Bajaj">Bajaj</option>
                        //         <option value="hero">Hero</option>
                        //         <option value="Honda">Honda</option>
                        //         <option value="Hero Honda">Hero Honda</option>
                        //         <option value="KTM">KTM</option>
                        //         <option value="Mahindra">Mahindra</option>
                        //         <option value="Royal Enfield">Royal Enfield</option>
                        //         <option value="Suzuki"> Suzuki</option>
                        //         <option value="TVS"> TVS</option>
                        //         <option value="Yamaha">Yamaha</option>
                        //     </select>
                        // </div>
                   
                        }if ( this.productType==="scooter") {
                            this.brand= <div className="catagory mt-5">
                    
                            <InputLabel id="label">Brands :</InputLabel>
                            <Select labelId="label" id="select"  onChange={this.onProductBrandChange} name="productBrand"
                                    >
                                <MenuItem value="selectBrands">Select Brands</MenuItem>
                                <MenuItem value="Aprilia">Aprilia</MenuItem>
                                <MenuItem value="bajaj">Bajaj</MenuItem>
                                <MenuItem value="hero">Hero</MenuItem>
                                <MenuItem value="honda">Honda</MenuItem>
                                <MenuItem value="Suzuki">Suzuki</MenuItem>
                                <MenuItem value="Tvs">TVS</MenuItem>
                                <MenuItem value="Vespa">Vespa</MenuItem>
                                <MenuItem value="Yamaha">Yamaha</MenuItem>
                                
                            </Select>
                        </div>

                        //     this.brand= <div>
                        //     <label>Brands:</label>
                        
                        //     <select onChange={this.onProductBrandChange} name="productBrand"
                        //             className="form-control">
                        //         <option value="Aprilia">Aprilia</option>
                        //         <option value="bajaj">Bajaj</option>
                        //         <option value="hero">Hero</option>
                        //         <option value="honda">Honda</option>
                        //         <option value="Suzuki">Suzuki</option>
                        //         <option value="Tvs">TVS</option>
                        //         <option value="Vespa">Vespa</option>
                        //         <option value="Yamaha">Yamaha</option>
                        //     </select>
                        // </div>
                    
                         }  if ( this.productType=="car") {
                            this.fuel= <div className="catagory mt-5">
                        
                            <InputLabel id="label">Fuel Type :</InputLabel>
                            <Select labelId="label" id="select"  onChange={this.onProductFuelChange} name="productFuel"
                                    >
                                <MenuItem value="selectBrands">Select Fuel type</MenuItem>        
                                <MenuItem value="Diesel">Diesel</MenuItem>
                                <MenuItem value="Diesel">Petrol</MenuItem>    
                            </Select>
                        </div>
                        
                            }else{
                                this.fuel=<div>
                                       
                                           </div>
                            }
                            if( this.productType=="mobile"){
                                  this.classD="d-none"
                            }else{
                                this.classD=""
                            }
        
          
        
  }
            //    ***** here we get value of product type and show its brand******************
      //    ***** here we get brnad value******************
    onProductBrandChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
            
        })
        this.brandname=e.target.value
    }
         //    ***** here we get brnad value******************

    render() {
        const {products, dealers, loading, has_more} = this.state;
        return (
            <div>
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
                <div className="col-md-8 col-sm-8 text-center searchM">
                <form className="d-flex searchBar searchHider">
                        <input  type="search" placeholder="Find Cars, Mobiles, Bikes and More...... "/>
                        <button className="btn" type="submit"><ImIcons.ImSearch className="icons"/></button>
                 </form>
                </div>
                <div className="main-container">
                            
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carouselImg"
                            src="https://images.unsplash.com/photo-1509225770129-fbcf8a696c0b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1959&q=80"
                            alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carouselImg"
                            src="https://images.unsplash.com/photo-1513735539099-cf6e5d559d82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80"
                            alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carouselImg"
                            src="https://images.unsplash.com/photo-1580117579193-ccc4066c8b18?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1784&q=80"
                            alt="Third slide"
                            />

                            
                        </Carousel.Item>
                        </Carousel>
                    {/* <Slider>
                        <Slide index={1}><img
                            style={{'objectFit': 'cover', 'height': '50%', 'width': '100%'}}
                            src="https://images.unsplash.com/photo-1509225770129-fbcf8a696c0b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1959&q=80"
                            alt="First slide"/></Slide>
                        
                        <Slide index={2}><img
                            style={{'objectFit': 'cover', 'height': '50%', 'width': '100%'}}
                            src="https://images.unsplash.com/photo-1513735539099-cf6e5d559d82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1441&q=80"
                            alt="First slide"/></Slide>
                        
                        <Slide index={3}><img
                            style={{'objectFit': 'cover', 'height': '50%', 'width': '100%'}}
                            src="https://images.unsplash.com/photo-1529984489975-079884dc3bc9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDB8fHBhbm9yYW1hfGVufDB8MHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            alt="First slide"/></Slide>
                        
                    </Slider> */}
                </div>
                
                {/* <div className="container" style={{marginTop: "35px"}}>
                    <div className="row">
                        <div className="col-sm-4 " style={{margin: 'auto'}}>
                            <div className="card">
                                <img className="card-img-top" src="/assets/images/customer3.jpg" alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">We Know our customer need.</h5>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4" style={{margin: 'auto'}}>
                            <div className="card">
                                <img className="card-img-top" src="/assets/images/customer-satisfaction.jpg"
                                     alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">Customer satisfaction is our top priority.</h5>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="container">
                    <div className="filters">
                        <div className="filterBtn" onClick={this.showFilterbar}> <a><BiIcons.BiFilter className="iconF"/> Filters</a> </div>
                        <div  className={this.state.filterbar ? 'filterBar' : 'filterBar active'}> 
                        
                        <div className="section-heading">
                                            <h2>Search by Filters</h2>
                                        </div>
                                                    <div className="catagory">
                                                      
                                                        <InputLabel id="label">City:</InputLabel>
                                                        <Select labelId="label" id="select" onChange={this.onProductTypeChange} name="productCity">
                                                            <MenuItem value="selectCity">Select city</MenuItem>
                                                            {
                                                                this.props.cityData && this.props.cityData.map(city => {
                                                                    return <MenuItem value={city.name}>{city.name}</MenuItem>
                                                                })
                                                            }
                                                        </Select>
                                                    </div>
                                                    <div>
                                                    
                                                    </div>
                                                    <div className="catagory mt-5" >
                                                      
                                                        <InputLabel id="label">Category:</InputLabel>
                                                        <Select labelId="label" id="select" onChange={this.onProductTypeChange} name="productType">
                                                            <MenuItem value="selectType">Select type</MenuItem>
                                                            <MenuItem value="car">Car</MenuItem>
                                                            <MenuItem value="motorcycle">Motorcycles</MenuItem>
                                                            <MenuItem value="scooter">Scooter</MenuItem>
                                                            <MenuItem value="mobile">Mobile</MenuItem>
                                                           
                                                        </Select>
                                                    </div>

                                                 <div className="catagory mt-5">
                                                    {this.brand}
                                                  </div>
                                                  <div className="catagory mt-5">
                                                    {this.fuel}
                                                  </div>
                                                  <div className="mt-5 " >
                                                  
                                                       <RangeSlider/>
                                                </div>
                                                <div className=" mt-5" className={this.classD}>
                                                  
                                                      <KmSlider/>
                                                </div>
                                                <div style={{marginTop:"40px"}} className={this.classD}>
                                                  
                                                      <YearSlider/>
                                                </div>
                                               
                                               
                                                  <div className="text-center mt-5">
                                                        <button onClick={(e) => this.productFilterSubmit(e)}
                                                                className="searchBtn">Search
                                                        </button>
                                                  </div>

                        </div>
                    </div>
                </div>   
                <div className="container-fluid" style={{"marginTop": "40px",}}>
                    <div className="row featuredContainer">
                        <div className="col-lg-3 col-md-3 filterHider">
                                      <div className="section-heading">
                                            <h2>Search by Filters</h2>
                                            {/*<p onClick={() => this.check} style={{cursor: 'pointer'}}>view more <i*/}
                                            {/*    className="fa fa-angle-right"></i></p>*/}
                                        </div>
                                                    <div className="catagory">
                                                        {/* <label>City:</label>
                                                        <select onChange={this.onProductTypeChange} name="productCity"
                                                                className="form-control">
                                                            <option>Select city</option>

                                                            {
                                                                this.props.cityData && this.props.cityData.map(city => {
                                                                    return <option value={city.name}>{city.name}</option>
                                                                })
                                                            }
                                                        </select> */}
                                                        <InputLabel id="label">City:</InputLabel>
                                                        <Select labelId="label" id="select" onChange={this.onProductTypeChange} name="productCity">
                                                            <MenuItem value="selectCity">Select city</MenuItem>
                                                            {
                                                                this.props.cityData && this.props.cityData.map(city => {
                                                                    return <MenuItem value={city.name}>{city.name}</MenuItem>
                                                                })
                                                            }
                                                        </Select>
                                                    </div>
                                                    <div>
                                                    
                                                    </div>
                                                    <div className="catagory mt-5" >
                                                        {/* <label>Category:</label>

                                                        <select onChange={this.onProductTypeChange} name="productType" 
                                                                className="form-control">
                                                            <option>Select type</option>
                                                            <option value="car">Car</option>
                                                            <option value="motorcycle">Motorcycles</option>
                                                            <option value="scooter">Scooter</option>
                                                            <option value="mobile">Mobile</option>
                                                        </select> */}
                                                        <InputLabel id="label">Category:</InputLabel>
                                                        <Select labelId="label" id="select" onChange={this.onProductTypeChange} name="productType">
                                                            <MenuItem value="selectType">Select type</MenuItem>
                                                            <MenuItem value="car">Car</MenuItem>
                                                            <MenuItem value="motorcycle">Motorcycles</MenuItem>
                                                            <MenuItem value="scooter">Scooter</MenuItem>
                                                            <MenuItem value="mobile">Mobile</MenuItem>
                                                           
                                                        </Select>
                                                    </div>

                                                 <div className="catagory mt-5">
                                                    {this.brand}
                                                  </div>
                                                  <div className="catagory mt-5">
                                                    {this.fuel}
                                                  </div>
                                                  <div className="mt-5 " >
                                                  
                                                       <RangeSlider/>
                                                </div>
                                                <div className=" mt-5" className={this.classD}>
                                                  
                                                      <KmSlider/>
                                                </div>
                                                <div style={{marginTop:"40px"}} className={this.classD}>
                                                  
                                                      <YearSlider/>
                                                </div>
                                               
                                                  <div className="text-center mt-5">
                                                        <button onClick={(e) => this.productFilterSubmit(e)}
                                                                className="searchBtn">Search
                                                        </button>
                                                  </div>

                                               

                        </div>
                        <div className="col-lg-9 col-md-9">
                            <div className="col-md-12">
                                        <div className="section-heading">
                                            <h2>Featured Products</h2>
                                            {/*<p onClick={() => this.check} style={{cursor: 'pointer'}}>view more <i*/}
                                            {/*    className="fa fa-angle-right"></i></p>*/}
                                        </div>
                                        {
                                            loading ? <Loader
                                                style={{marginTop: "100px", textAlign: 'center'}}
                                                type="Rings"
                                                color="red"
                                                height={100}
                                                width={100}
                                            /> : ''
                                        }
                                    </div>
                          <div className="row">
                              {/* *****************************************     from here products show***************************** */}

                              
                                    {
                                        products.map(product => {
                                            return (
                                                  <div className="col-lg-4 col-md-6">
                                                    <div className="product-item">
                                                        <Link to={`/product/${product.slug}`}>
                                                            {
                                                                product.images && product.images[0] !== undefined ?
                                                                    <img style={{
                                                                        height: '232px',
                                                                        objectFit: 'cover'
                                                                    }}
                                                                         src={`${URL}${product.images && product.images[0].image}`}
                                                                         alt=""/> : ''
                                                            }

                                                        </Link>
                                                        <div className="down-content">
                                                            <h4>
                                                                <Link to={`/product/${product.slug}`}>
                                                                    {product.model}
                                                                </Link>
                                                            </h4>

                                                            <h6><small>
                                                            </small> ₹ {product.price}
                                                            </h6>

                                                            {/*<p>190 hp &nbsp;/&nbsp; Petrol &nbsp;/&nbsp; 2008 &nbsp;/&nbsp; Used*/}
                                                            {/*    vehicle</p>*/}
                                                        
                                                          <div className="bottom-content">
                                                            <small>
                                                                {
                                                                    product.km === null ? '' : <strong title="Author" className="kilometer"><i
                                                                        className="fa fa-dashboard"></i>&nbsp;{product.km}km
                                                                    </strong>
                                                                }
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <strong title="Author" className="kilometer"><i
                                                                    className="fa fa-cube"></i> &nbsp;{product.color}
                                                                </strong>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                {/*<strong title="Views"><i*/}
                                                                {/*    className="fa fa-cog"></i> Manual</strong>*/}
                                                            </small>
                                                          </div>   
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    

                                </div>
  {/* *****************************************     from here products show end***************************** */}

                                    <div style={{textAlign: "center", marginTop: "50px"}}>
                                        {
                                            !has_more ? "No more products" : <Button onClick={() => this.loadProduct()} color="red"
                                            >View more</Button>
                                        }
                                    </div>
                            </div>
                        </div>

                         
                </div>
               
                       
                <div className="best-features about-features">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading text-center">
                                    <h2 id="about" style={{color:"grey", fontWeight:'600'}}>ABOUT SEC2HAND</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="right-image">
                                    <img style={{
                                        marginTop: '-61px',
                                        // width: '402px',
                                    }} src="/assets/images/Sec2Hand_Logo_3.png" alt=""/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="left-content">
                                    <h4>About us</h4>
                                    <p>Sec2Hand is a leading e-commerce platform. which offers you the service to buy
                                        and sell second hand Bikes, Cars and Mobiles with trusted Dealers.
                                        Sec2hand works in C2B & B2C Market place.</p>
                                </div>
                                <br/>
                                <div className="left-content">
                                    <h4>Vision & Mission</h4>
                                    <p>We provide you with quality Second hand products.
                                        We are with you 24*7.</p>
                                    <ul className="social-icons">
                                        <li><a href="https://www.facebook.com/Sec2Hand-360972987823797/"><i
                                            className="fa fa-facebook"></i></a></li>
                                        <li><a
                                            href="https://www.instagram.com/invites/contact/?i=14qq181cy3b1b&utm_content=eghzw47 "><i
                                            className="fa fa-instagram"></i></a></li>
                                        <li><a href="https://www.youtube.com/c/Sec2hand"><i
                                            className="fa fa-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="contact">
                    <div className="send-message">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="section-heading text-center">
                                        <h2>Send us a Message</h2>
                                    </div>
                                </div>
                                <div className="col-md-8 col-lg-8 col-8 offset-2">
                                    <div className="contact-form">
                                        <form id="contact" action="" method="post">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12 ">
                                                    <fieldset>
                                                        <input name="name" type="text" className="form-control contactUs"
                                                               id="name"
                                                               placeholder="Full Name" required=""/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <fieldset>
                                                        <input name="email" type="text" className="form-control contactUs"
                                                               id="email"
                                                               placeholder="E-Mail Address" required=""/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <fieldset>
                                                        <input name="subject" type="text" className="form-control contactUs"
                                                               id="subject" placeholder="Subject" required=""/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-lg-12">
                                                    <fieldset>
                                                    <textarea name="message" rows="6" className="form-control contactUs"
                                                              id="message" placeholder="Your Message"
                                                              required=""/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-lg-12 text-center">
                                                    <fieldset>
                                                        <button type="submit" id="form-submit"
                                                                className="filled-button">Send Message
                                                        </button>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/*<div className="col-md-4">*/}
                                {/*    <img src="/assets/images/Sec2Hand_Logo_3.png" className="img-fluid" alt=""/>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        token: state.auth.token,
        cityData:state.cityList.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        fetchCityList: () => dispatch(fetchCity())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(HomepageLayout)
);