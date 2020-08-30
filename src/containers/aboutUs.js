import React from 'react';

class AboutUs extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <div className="page-heading about-heading header-text"
                     style={{backgroundImage: 'url(assets/images/heading-1-1920x500.jpg)'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-content">
                                    <h4>about us</h4>
                                    <h2>our company</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="best-features about-features">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2>About Sec2 hand</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="right-image">
                                    <img src="/assets/images/Sec2Hand_Logo_3.png" alt=""/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="left-content">
                                    <h4>About us</h4>
                                    <p>Sec2Hand is a leading e-commerce platform. which offers you the service to buy and sell second hand Bikes, Cars and Mobiles with trusted Dealers.
                                        Sec2hand works in C2B & B2C Market place.</p>
                                </div>
                                <br/>
                                <div className="left-content">
                                    <h4>Vision & Mission</h4>
                                    <p>We provide you with quality Second hand products.
                                        We are with you 24*7.</p>
                                    <ul className="social-icons">
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                        <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/*<div className="team-members">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-md-12">*/}
                {/*                <div className="section-heading">*/}
                {/*                    <h2></h2>*/}
                {/*                </div>*/}

                {/*                <h5>Lorem ipsum dolor sit amet.</h5>*/}

                {/*                <p></p>*/}

                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default AboutUs