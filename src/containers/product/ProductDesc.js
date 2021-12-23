import React, { useEffect, useState } from "react";
import "./product.css";
import { Link, useHistory, withRouter } from "react-router-dom";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Rating from "@material-ui/lab/Rating";
import { header } from "../../store/utility";
import { productDetailURL } from "../../store/constants";
import { toast } from "react-toastify";
import axios from "axios";

function ProductDesc({ product, category, usernames }) {
  // const [screen, setScreen] = uSeState(initialState)
  var screenSize = parseFloat(product.screen_size).toFixed(2);
  const history = useHistory();
  const deleteProduct = (id) => {
    let headers = {
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    axios
      .delete(productDetailURL(id), header())
      .then((res) => {
        console.log(res.data);
        toast.success("Product has been deleted!");
        setTimeout(() => {
          history.goBack();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderElements = () => {
    return (
      <div>
        <div className="row mt-5 descriptiontab">
          <div className="col-lg-6 col-md-6 col-sm-6 col-8 offset-2 mt-8">
            <form action="#" method="post" className="form">
              <ul className="list-group list-group-flush">
                {product.title ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left"> Title</span>

                      <strong className="pull-right">{product.title}</strong>
                    </div>
                  </li>
                ) : null}
                {product.author ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Author</span>

                      <strong className="pull-right">{product.author}</strong>
                    </div>
                  </li>
                ) : null}
                {product.edition ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Edition</span>

                      <strong className="pull-right">{product.edition}</strong>
                    </div>
                  </li>
                ) : null}
                {product.property_type ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Property Type</span>

                      <strong className="pull-right">
                        {product.property_type}
                      </strong>
                    </div>
                  </li>
                ) : null}
                {product.bed_room ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Bed room</span>

                      <strong className="pull-right">{product.bed_room}</strong>
                    </div>
                  </li>
                ) : null}
                {product.bathroom ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Bathroom</span>

                      <strong className="pull-right">{product.bathroom}</strong>
                    </div>
                  </li>
                ) : null}
                {product.furnishing ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Furnishing</span>

                      <strong className="pull-right">
                        {product.furnishing}
                      </strong>
                    </div>
                  </li>
                ) : null}
                {product.construction_status ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Construction status</span>

                      <strong className="pull-right">
                        {product.construction_status}
                      </strong>
                    </div>
                  </li>
                ) : null}
                {product.super_area ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Super area</span>

                      <strong className="pull-right">
                        {product.super_area}
                      </strong>
                    </div>
                  </li>
                ) : null}
                {product.carpet_area ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Carpet area</span>

                      <strong className="pull-right">
                        {product.carpet_area}
                      </strong>
                    </div>
                  </li>
                ) : null}
                {product.car_parking ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Car parking</span>

                      <strong className="pull-right">
                        {product.car_parking}
                      </strong>
                    </div>
                  </li>
                ) : null}
                {product.car_parking ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Car parking</span>

                      <strong className="pull-right">
                        {product.car_parking}
                      </strong>
                    </div>
                  </li>
                ) : null}
                {product.facing ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left"> Facing</span>

                      <strong className="pull-right">{product.facing}</strong>
                    </div>
                  </li>
                ) : null}

                {product.model ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left"> Model</span>
                      <strong className="pull-right">{product.model}</strong>
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

                      <strong className="pull-right">{product.km} KM </strong>
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
                {product.color ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Color</span>

                      <strong className="pull-right">{product.color}</strong>
                    </div>
                  </li>
                ) : null}

                {product.ram ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left"> Ram</span>

                      <strong className="pull-right">{product.ram}GB</strong>
                    </div>
                  </li>
                ) : (
                  ""
                )}
                {product.rom ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left"> Rom</span>

                      <strong className="pull-right">{product.rom} GB</strong>
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
                        {product.camera} MP
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

                      <strong className="pull-right">{screenSize} inch</strong>
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
                        {product.battery} mah
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
                {product.body_type ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Body Type</span>

                      <strong className="pull-right">
                        {product.body_type}
                      </strong>
                    </div>
                  </li>
                ) : (
                  ""
                )}
                {product.screen_type ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Screen Type</span>

                      <strong className="pull-right">
                        {product.screen_type}
                      </strong>
                    </div>
                  </li>
                ) : (
                  ""
                )}
                {product.battery_duration ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Battery Duration</span>

                      <strong className="pull-right">
                        {product.battery_duration}
                      </strong>
                    </div>
                  </li>
                ) : (
                  ""
                )}
                {product.ssd ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Storage</span>

                      <strong className="pull-right">
                        {product.ssd ? "SSD" : "HDD"}
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
                        {product.usage_duration} hrs
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
                {product.year ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Year</span>

                      <strong className="pull-right">{product.year}</strong>
                    </div>
                  </li>
                ) : null}

                <li className="list-group-item">
                  <div className="clearfix">
                    <span className="pull-left">Price</span>

                    <strong className="pull-right">₹{product.price}</strong>
                  </div>
                </li>
                {product.ownership_state ? (
                  <li className="list-group-item">
                    <div className="clearfix">
                      <span className="pull-left">Ownership State</span>

                      <strong className="pull-right">
                        {product.ownership_state}
                      </strong>
                    </div>
                  </li>
                ) : null}

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

                      <strong className="pull-right">{product.state}</strong>
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

                      <strong className="pull-right">{product.variant}</strong>
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
                      <span className="pull-left"> Registration transfer</span>

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

                      <strong className="pull-right">{product.invoice}</strong>
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
                    {/* <Link to={`/profile/${product.user}`}> */}
                    <strong className="pull-right">{product.user}</strong>
                    {/* </Link> */}
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
                  onClick={() => deleteProduct(product.slug)}
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
  };

  return (
    <div className="product_desc">
      <div>{renderElements()}</div>
      {/* <h1>my brand name -{products.product &&products.product.product.brand}</h1> */}
    </div>
  );
}

export default ProductDesc;
