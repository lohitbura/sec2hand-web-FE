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

class Dealer extends React.Component {
    state = {
        dealers: []
    }

    componentDidMount() {
        axios.post(dealerListURL, {}).then(res => {
            this.setState({dealers: res.data})
        })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {dealers} = this.state;
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
                                        <label>State:</label>

                                        <select className="form-control">
                                            <option value="">All</option>
                                            <option value="new">New vehicle</option>
                                            <option value="used">Used vehicle</option>
                                        </select>

                                        <label>Area:</label>

                                        <select className="form-control">
                                            <option value="">--All --</option>
                                            <option value="">--All --</option>
                                            <option value="">--All --</option>
                                            <option value="">--All --</option>
                                            <option value="">--All --</option>
                                        </select>

                                        <button type="submit" className="filled-button btn-block">Search</button>
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
                                                        <img src={`${URL}${dealer.image}`}
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
                                                                className="fa fa-dashboard"/> {dealer.city}
                                                            </strong> &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <strong title="Author"><i
                                                                className="fa fa-cube"/> {dealer.area}
                                                            </strong>&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <strong title="Views"><i
                                                                className="fa fa-cog"/> Manual</strong>
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
                                        <div style={{textAlign: "center", marginTop: "50px"}}>
                                            <Pagination className="pages"
                                                        boundaryRange={0}
                                                        defaultActivePage={1}
                                                        ellipsisItem={null}
                                                        firstItem={null}
                                                        lastItem={null}
                                                        siblingRange={1}
                                                        totalPages={10}
                                            />
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
