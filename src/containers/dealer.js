import PropTypes from "prop-types";
import React, {Component} from "react";
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


import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import Pagination from "semantic-ui-react/dist/commonjs/addons/Pagination";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import axios from 'axios';
import {dealerListURL, URL} from "../store/constants";
import Loader from "react-loader-spinner";

class Dealer extends React.Component {
    state = {
        dealers: [],
        loading: false,
        limit: 6,
        limit1: 6,
        offset: 0,
        offset1: 0,
        has_more: true,
        city: '',
        area: '',
        category: ''
    }

    constructor(props) {
        super(props);

        window.onscroll = () => {
            const {
                state: {has_more, loading, error}
            } = this;

            if (!has_more) return;
            if ((document.documentElement.scrollHeight - document.documentElement.scrollTop - 200) <= document.documentElement.clientHeight) {
                this.loadDealers()
            }
        }
    }

    componentWillMount() {
        this.loadDealers()
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    loadDealers = () => {
        const {limit, offset, dealers} = this.state;
        this.setState({loading: true})
        axios.post(dealerListURL, {limit: limit, offset: offset}).then(res => {
            this.setState({
                dealers: [...dealers, ...res.data.dealers],
                loading: false,
                offset: limit + offset,
                has_more: res.data.has_more
            })
        })
            .catch(err => {
                console.log(err)
            })
    }

    onChange = (e) => {
        console.log(e.target.name + ":" + e.target.value)
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

    render() {
        const {dealers, loading, has_more} = this.state;
        const options = [
            {key: 1, text: 'Choice 1', value: 1},
            {key: 2, text: 'Choice 2', value: 2},
            {key: 3, text: 'Choice 3', value: 3},
        ]
        return (
            <div>
                <div className="page-heading about-heading header-text"
                     style={{'background-image': 'url(assets/images/slider-image-1-1600x800.jpg)'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-content">
                                    <h4>Find dealer</h4>
                                    <h2>Cars/Bike</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="products">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="contact-form">
                                    <form action="#">
                                        <label>City:</label>

                                        <input onChange={this.onChange} name="city" className="form-control" type="text"
                                               placeholder="search city"/>

                                        <label>Area:</label>

                                        <input onChange={this.onChange} name="area" className="form-control" type="text"
                                               placeholder="search area"/>
                                        <label>Category:</label>

                                        <select onChange={this.onChange} name="category" className="form-control">
                                            <option>All</option>
                                            <option value="car">Car</option>
                                            <option value="bike">Bike</option>
                                            <option value="mobile">Mobile</option>
                                        </select>

                                        <button onClick={(e) => this.onSubmit(e)}
                                                className="filled-button btn-block">Search
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="col-md-9">

                                <div className="row">
                                    {dealers.map(dealer => {
                                        return (
                                            <div className="col-md-4">
                                                <div className="product-item">
                                                    <Link to={`/profile/${dealer.user}`}>
                                                        <img style={{
                                                            height: '232px',
                                                            objectFit: 'cover'
                                                        }} src={`${URL}${dealer.image}`}
                                                             alt=""/>
                                                    </Link>

                                                    <div className="down-content">
                                                        <Link to={`/profile/${dealer.user}`}>
                                                            <h4>{dealer.shop_name}</h4>
                                                        </Link>

                                                        {/*<h6><small>*/}
                                                        {/*    <del> $11199.00</del>*/}
                                                        {/*</small> $11179.00*/}
                                                        {/*</h6>*/}

                                                        <p>Dealer:{dealer.user}</p>

                                                        <small>
                                                            <strong title="Author"><i
                                                                className="fa fa-home"/> {dealer.city}
                                                            </strong> &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <strong title="Author"><i
                                                                className="fa fa-home"/> {dealer.area}
                                                            </strong>&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <strong title="Views"><i
                                                                className="fa fa-cubes"/> {dealer.category}</strong>
                                                        </small>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}

                                    <div className="col-md-12">
                                        {/*<ul className="pages">*/}
                                        {/*    <li><a href="#">1</a></li>*/}
                                        {/*    <li className="active"><a href="#">2</a></li>*/}
                                        {/*    <li><a href="#">3</a></li>*/}
                                        {/*    <li><a href="#">4</a></li>*/}
                                        {/*    <li><a href="#"><i className="fa fa-angle-double-right"></i></a></li>*/}
                                        {/*</ul>*/}
                                        <div style={{textAlign: "center", marginTop: "10px"}}>
                                            {
                                                loading ? <Loader
                                                    style={{marginTop: "100px", textAlign: 'center'}}
                                                    type="Rings"
                                                    color="red"
                                                    height={100}
                                                    width={100}
                                                /> : ''
                                            }
                                            {
                                                !has_more ? "No more dealers" : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // <Container>
            //     <Grid columns={2}>
            //         <Grid.Column>
            //             <Dropdown clearable options={options} selection placeholder='State'/>
            //             <Dropdown clearable options={options} selection placeholder='City'/>
            //             <Button secondary>Submit</Button> </Grid.Column>
            //         <Grid.Column>
            //             <Input focus placeholder='Search...'/>
            //             <Button secondary>Search</Button>
            //         </Grid.Column>
            //     </Grid>
            //     <Grid style={{marginTop: '50px'}} columns={3}>
            //         {
            //             dealers.map(dealer => {
            //                 return(
            //                     <Grid.Column>
            //                         <Card>
            //                             <Image
            //                                 src='https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
            //                                 wrapped ui={false}/>
            //                             <Card.Content>
            //                                 <Card.Header>
            //                                     <Link to={`/profile/${dealer.user}`}>
            //                                         {dealer.shop_name}
            //                                     </Link>
            //                                 </Card.Header>
            //                                 <Card.Meta>Joined in 2016</Card.Meta>
            //                                 <Card.Description>
            //                                     {dealer.city}
            //                                 </Card.Description>
            //                             </Card.Content>
            //                         </Card>
            //                     </Grid.Column>
            //                 )
            //             })
            //         }
            //
            //     </Grid>
            //     <div style={{textAlign: "center", marginTop: "50px"}}>
            //         <Pagination
            //             boundaryRange={0}
            //             defaultActivePage={1}
            //             ellipsisItem={null}
            //             firstItem={null}
            //             lastItem={null}
            //             siblingRange={1}
            //             totalPages={10}
            //         />
            //     </div>
            // </Container>
        )
    }
}

export default Dealer;
