import React, { useEffect, useState } from "react";
import "./productDetail/product.css";
import { Link, withRouter } from "react-router-dom";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Rating from "@material-ui/lab/Rating";


function ProductDesc({ product, category, usernames }) {
    // const [screen, setScreen] = uSeState(initialState)
  var screenSize = parseFloat(product.screen_size).toFixed(2);
    
    const renderElements = () => {
       
        return (
          <div>
            <div className="row mt-5 descriptiontab">
              <div className="col-lg-6 col-md-6 col-sm-6 col-8 offset-2 mt-8">
                <form action="#" method="post" className="form">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="clearfix">
                        <span className="pull-left"> Brand</span>

                        <strong className="pull-right">{product.brand}</strong>
                      </div>
                    </li>
                    {product.model ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Model</span>
                          <strong className="pull-right">
                            {product.model}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.type ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Type</span>

                          <strong className="pull-right">{product.type}</strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.fuel_type ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Fuel Type</span>

                          <strong className="pull-right">
                            {product.fuel_type}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.km ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Distance</span>

                          <strong className="pull-right">{product.km}</strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.operating_system ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> OS</span>

                          <strong className="pull-right">
                            {product.operating_system}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    <li className="list-group-item">
                      <div className="clearfix">
                        <span className="pull-left">Color</span>

                        <strong className="pull-right">{product.color}</strong>
                      </div>
                    </li>
                    {product.ram ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Ram</span>

                          <strong className="pull-right">{product.ram}</strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.rom ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Rom</span>

                          <strong className="pull-right">{product.rom}</strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.camera ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Camera</span>

                          <strong className="pull-right">
                            {product.camera}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.display_type ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Display type</span>

                          <strong className="pull-right">
                            {product.display_type}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.screen_size ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Screen Size</span>

                          <strong className="pull-right">
                            {screenSize}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.battery ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Battery Capacity</span>

                          <strong className="pull-right">
                            {product.battery}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.processor ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Processor</span>

                          <strong className="pull-right">
                            {product.processor}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.usage_duration ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Usage duration</span>

                          <strong className="pull-right">
                            {product.usage_duration}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.charger_included ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Charger Included</span>

                          <strong className="pull-right">
                            {product.charger_included}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    <li className="list-group-item">
                      <div className="clearfix">
                        <span className="pull-left">Year</span>

                        <strong className="pull-right">{product.year}</strong>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="clearfix">
                        <span className="pull-left">Price</span>

                        <strong className="pull-right">₹{product.price}</strong>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="clearfix">
                        <span className="pull-left">Ownership State</span>

                        <strong className="pull-right">
                          {product.ownership_state}
                        </strong>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="clearfix">
                        <span className="pull-left">Currently at</span>

                        <strong className="pull-right">{product.city}</strong>
                      </div>
                    </li>
                    {product.state ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> State</span>

                          <strong className="pull-right">
                            {product.state}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.transmission ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Transmission</span>

                          <strong className="pull-right">
                            {product.transmission}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.variant ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Varient</span>

                          <strong className="pull-right">
                            {product.variant}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.description ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Description</span>

                          <strong className="pull-right">
                            {product.description}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                   
                    
                    {product.camera_rate ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Camera Rating</span>

                          <strong className="pull-right">
                            <Rating
                              name="half-rating-read"
                              defaultValue={product.camera_rate}
                              precision={0.5}
                              readOnly
                            />
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.battery_rate ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Battery Rating</span>

                          <strong className="pull-right">
                            <Rating
                              name="half-rating-read"
                              defaultValue={product.battery_rate}
                              precision={0.5}
                              readOnly
                            />
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.display_rate ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Display Rating</span>

                          <strong className="pull-right">
                            <Rating
                              name="half-rating-read"
                              defaultValue={product.display_rate}
                              precision={0.5}
                              readOnly
                            />
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.engine_rate ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Engine rating</span>

                          <strong className="pull-right">
                            <Rating
                              name="half-rating-read"
                              defaultValue={product.engine_rate}
                              precision={0.5}
                              readOnly
                            />
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.body_rate ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Body Rate</span>

                          <strong className="pull-right">
                            <Rating
                              name="half-rating-read"
                              defaultValue={product.body_rate}
                              precision={0.5}
                              readOnly
                            />
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.interior_rate ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">Interior rating</span>

                          <strong className="pull-right">
                            <Rating
                              name="half-rating-read"
                              defaultValue={product.interior_rate}
                              precision={0.5}
                              readOnly
                            />
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}

                    {product.exterior_rate ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Exterior Rating</span>

                          <strong className="pull-right">
                            <Rating
                              name="half-rating-read"
                              defaultValue={product.exterior_rate}
                              precision={0.5}
                              readOnly
                            />
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.registration_transfer ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left">
                            {" "}
                            Registration transfer
                          </span>

                          <strong className="pull-right">
                            {product.registration_transfer}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.hypothetication ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> hypothetication</span>

                          <strong className="pull-right">
                            {product.hypothetication}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.invoice ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> invoice</span>

                          <strong className="pull-right">
                            {product.invoice}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.service_history ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Service history</span>

                          <strong className="pull-right">
                            {product.service_history}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                    {product.insurance ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Insurance</span>

                          <strong className="pull-right">
                            {product.insurance}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}

                    {product.insurance_date ? (
                      <li className="list-group-item">
                        <div className="clearfix">
                          <span className="pull-left"> Insurance Date</span>

                          <strong className="pull-right">
                            {product.insurance_date}
                          </strong>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}

                    <li className="list-group-item">
                      <div className="clearfix">
                        <span className="pull-left">Dealer profile</span>
                        <Link to={`/profile/${product.user}`}>
                          <strong className="pull-right">{product.user}</strong>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </form>
                <br />
                {product.user === usernames ? (
                  <div>
                    <Link to={`/productEdit/${product.slug}`}>
                      <Button content="Edit" color="green" />
                    </Link>
                    <Button
                      onClick={() => this.deleteProduct(product.slug)}
                      content="Delete"
                      color="red"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
    
             
}
         
            
    
    return (
      <div className="product_desc">
        <div>
          {renderElements()}
        
        </div>
        {/* <h1>my brand name -{products.product &&products.product.product.brand}</h1> */}
      </div>
    );
}

export default ProductDesc

