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

import {dealerListURL, productListURL, URL,productListURLS, URLS} from "../store/constants";
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
        productBrand:'',
        productModel:'',
        productFuel:'',
        productKmStart:'',
        productKmend:'',
        productPriceStart:'',
        productPriceEnd:'',
        productYearStart:'',
        productYearEnd:'',
        productOwner_state: '',
        filterbar:'',
        data1:[],
        data2:[],
        data3:[]
    }
    

    componentDidMount() {
        this.loadProduct()
        this.props.fetchCityList();
    }

    showFilterbar=()=>{
        
        this.setState(currentState => ({
           filterbar: !currentState.filterbar
         }));
    }
    
    handleCallbackFirst = (childData) =>{
        this.setState({
        data1:childData
        });
    }

    handleCallbackSecond = (childData) =>{
        this.setState({
        data2:childData
        })
    }

    handleCallbackThird = (childData) =>{
        this.setState({
        data3:childData
        })
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
        const {limit, offset2, products,data1,data2,data3 ,productType, productBrand, productModel, productFuel, productCity} = this.state;
        var {productOwner_state,productKmStart, productKmend, productPriceStart, productPriceEnd ,productYearStart, productYearEnd}=this.state;
        productYearStart=data3[0];
        productYearEnd=data3[1];
        productKmStart=data2[0];
        productKmend=data2[1];
        productPriceStart=data1[0];
        productPriceEnd=data1[1];
        
        this.setState({loading: true})
        axios.get(productListURL(limit, offset2, productType, productBrand, productModel, productFuel, productOwner_state, productCity, productKmStart, productKmend, productPriceStart, productPriceEnd, productYearStart, productYearEnd )).then(res => {
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

    // productSearchSubmit = (e) => {
    //     e.preventDefault();
    //     const {limit, offset2, products,productType} = this.state;
        
    //     this.setState({loading: true})
    //     axios.get(productListURL(limit, offset2, productType )).then(res => {
    //         this.setState({
    //             products: res.data.products,
    //             loading: false,
    //             has_more: res.data.has_more
    //         })
            
    //     })
    //         .catch(err => {
    //             console.log(err)
    //         })

         
    // }

    loadProduct = () => {
        const {limit, offset, products, productType, productBrand, productModel, productFuel, productOwner_state, productCity, productKmStart, productKmend, productPriceStart, productPriceEnd, productYearStart, productYearEnd} = this.state;
        this.setState({loading: true})
        axios.get(productListURL(limit, offset, productType, productBrand, productModel, productFuel, productOwner_state, productCity, productKmStart, productKmend, productPriceStart, productPriceEnd, productYearStart, productYearEnd)).then(res => {
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
       
         
        if((e.target.value=="cars")||(e.target.value=="Car")||(e.target.value=="Cars")||(e.target.value=="latest car")||(e.target.value=="4 wheeler")||(e.target.value=="4 wheeleres")||(e.target.value=="gadiya")||(e.target.value=="Honda cars")||(e.target.value=="tata")||(e.target.value=="maruti")||(e.target.value=="swift")||(e.target.value=="car")){
            this.setState({
                [e.target.name]: "car"
            })
        }
        if((e.target.value=="motorcycle")||(e.target.value=="bike")||(e.target.value=="bikes")||(e.target.value=="Bike")||(e.target.value=="Bikes")||(e.target.value=="hero honda")||(e.target.value=="Motor")||(e.target.value=="Motorcycle")||(e.target.value=="hero")||(e.target.value=="Hero")||(e.target.value=="gadi")||(e.target.value=="motor")){
            this.setState({
                [e.target.name]: "motorcycle"
            })
        }
        if((e.target.value=="mobile")||(e.target.value=="Mobile")||(e.target.value=="phone")||(e.target.value=="smartphones")||(e.target.value=="smartphones")||(e.target.value=="keypad")||(e.target.value=="redmi")||(e.target.value=="apple")||(e.target.value=="Apple")||(e.target.value=="samsung")||(e.target.value=="Samsung")){
            this.setState({
                [e.target.name]: "mobile"
            })
        }
        if((e.target.value=="scooty")||(e.target.value=="scooter")||(e.target.value=="scoty")||(e.target.value=="activa")||(e.target.value=="Activa")||(e.target.value=="honda scoty")||(e.target.value=="Mopad")||(e.target.value=="mopad")||(e.target.value=="activa new model")||(e.target.value=="tvs scooty")||(e.target.value=="pept")||(e.target.value=="pept scoty")){
            this.setState({
                [e.target.name]: "scooter"
            })
        }
    //    ***** here we get value of product type and show its brand******************
        this.productType=e.target.value
                        if ( this.productType=="car") {
                        this.brand= <div className="catagory mt-5">
                    
                        <InputLabel id="label">Brands :</InputLabel>
                        <Select labelId="label" id="select"  onChange={this.onProductBrandChange} name="productBrand"
                                >
                            <MenuItem value="selectBrands">Select Brands</MenuItem>      
                            <MenuItem value="Chevrolate">Chevrolate</MenuItem>
                            <MenuItem value="Datsun">Datsun</MenuItem>
                            <MenuItem value="Ford">Ford</MenuItem>
                            <MenuItem value="Hyundai">Hyundai</MenuItem>
                            <MenuItem value="honda">Honda</MenuItem>
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
                    
                        }if ( this.productType==="motorcycle") {
                            this.brand= <div className="catagory mt-5">
                    
                            <InputLabel id="label">Brands :</InputLabel>
                            <Select labelId="label" id="select"  onChange={this.onProductBrandChange} name="productBrand"
                                    >
                                <MenuItem value="selectBrands">Select Brands</MenuItem>
                                <MenuItem value="Bajaj">Bajaj</MenuItem>
                                <MenuItem value="hero">Hero</MenuItem>
                                <MenuItem value="honda">Honda</MenuItem>
                                <MenuItem value="Hero Honda">Hero Honda</MenuItem>
                                <MenuItem value="KTM">KTM</MenuItem>
                                <MenuItem value="Mahindra">Mahindra</MenuItem>
                                <MenuItem value="Royal Enfield">Royal Enfield</MenuItem>
                                <MenuItem value="Suzuki"> Suzuki</MenuItem>
                                <MenuItem value="TVS"> TVS</MenuItem>
                                <MenuItem value="Yamaha">Yamaha</MenuItem>
                                
                            </Select>
                        </div>

                       
                   
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

                      
                    
                         }  if ( this.productType=="car") {
                            this.fuel= <div className="catagory mt-5">
                        
                            <InputLabel id="label">Fuel Type :</InputLabel>
                            <Select labelId="label" id="select"  onChange={this.onProductFuelChange} name="productFuel"
                                    >
                                <MenuItem value="selectBrands">Select Fuel type</MenuItem>        
                                <MenuItem value="Diesel">Diesel</MenuItem>
                                <MenuItem value="Petrol">Petrol</MenuItem>    
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
    onProductFuelChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
            
        })
    }
    onProductCityChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
            
        })
    }
         //    ***** here we get brnad value******************

    render() {
        const {products ,loading, has_more} = this.state;
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
                        <input  type="search" placeholder="Find Cars, Mobile, Bikes and Many More...... " onChange={this.onProductTypeChange} name="productType" />
                        <button className="btn" type="submit" onClick={(e) => this.productFilterSubmit(e)} ><ImIcons.ImSearch className="icons"/></button>
                 </form>{
                 console.log('===================================='),
                 console.log(this.productType),
                 console.log('====================================')}
                </div>
                <div className="main-container">
                            
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carouselImg"
                            src="../../assets/images/slider1.jpg"
                            alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carouselImg"
                            src="../../assets/images/slider2.jpg"
                            alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carouselImg"
                            src="../../assets/images/slider3.jpg"
                            alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 carouselImg"
                            src="../../assets/images/slider4.jpg"
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
{/* 
**********************************************************************************************
                                 Filters
************************************************************************************** */}


                <div className="container">
                    <div className="filters">
                        <div className="filterBtn" onClick={this.showFilterbar}> <a><BiIcons.BiFilter className="iconF"/> Filters</a> </div>
                        <div  className={this.state.filterbar ? 'filterBar' : 'filterBar active'}> 
                        
                        <div className="section-heading">
                                            <h2>Search by Filters</h2>
                                        </div>
                                        <form method="GET">
                                                    <div className="catagory">
                                                      
                                                        <InputLabel id="label">City:</InputLabel>
                                                        <Select labelId="label" id="select" onChange={this.onProductCityChange} name="productCity">
                                                            <MenuItem value="selectCity">Select city</MenuItem>
                                                            {
                                                                this.props.cityData && this.props.cityData.map(city => {
                                                                    return <MenuItem value={city.name}>{city.name}</MenuItem>
                                                                })
                                                            }
                                                        </Select>
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
                                                  
                                                       <RangeSlider parentCallback = {this.handleCallbackFirst}/>
                                                       
                                                </div>
                                                <div className=" mt-5" className={this.classD}>
                                                  
                                                      <KmSlider parentCallback = {this.handleCallbackSecond}/>
                                                      
                                                </div>
                                                <div style={{marginTop:"40px"}} className={this.classD}>
                                                  
                                                      <YearSlider parentCallback = {this.handleCallbackThird}/>
                                                      
                                                </div>
                                               
                                               
                                                  <div className="text-center mt-5">
                                                        <button onClick={(e) => this.productFilterSubmit(e)}
                                                                className="searchBtn">Search
                                                        </button>
                                                  </div>
                                                  </form>

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
                                        <form method="GET">
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
                                                  
                                                       <RangeSlider parentCallback = {this.handleCallbackFirst}/>
                                                       
                                                </div>
                                                <div className=" mt-5" className={this.classD}>
                                                  
                                                      <KmSlider parentCallback = {this.handleCallbackSecond}/>
                                                </div>
                                                <div style={{marginTop:"40px"}} className={this.classD}>
                                                  
                                                      <YearSlider parentCallback = {this.handleCallbackThird}/>
                                                      
                                                </div>
                                               
                                               
                                                  <div className="text-center mt-5">
                                                        <button onClick={(e) => this.productFilterSubmit(e)}
                                                                className="searchBtn">Search
                                                        </button>
                                                  </div>

                                               
                            </form>
                        </div>

                        {/* 
**********************************************************************************************
                                 Filters end
************************************************************************************** */}
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