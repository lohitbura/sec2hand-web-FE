import React from "react";
import { Link } from "react-router-dom";
import { URL } from "../../store/constants";

export default function ProductBox({ products, isCategory = false }) {
  return (
    <div className="row">
      {products.map((product) => {
        return (
          <div className="col-lg-3 col-md-6">
            <div className="product-item">
              <Link to={`/product/${product.slug}`}>
                {product.images && product.images[0] !== undefined ? (
                  <img
                    style={{
                      height: "232px",
                      objectFit: "cover",
                    }}
                    src={`${
                      isCategory
                        ? URL + product.images[0].image
                        : product.images && product.images[0].image
                    }`}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </Link>
              <div className="down-content">
                <Link to={`/product/${product.slug}`}>
                  <h4 className="productModelName">
                    {product.category == "car" ||
                    product.category == "bike" ||
                    product.category == "mobile"
                      ? product.model
                      : product.title}
                  </h4>
                </Link>
                <h6>
                  <small></small> ₹ {product.price}
                </h6>

                {/*<p>190 hp &nbsp;/&nbsp; Petrol &nbsp;/&nbsp; 2008 &nbsp;/&nbsp; Used*/}
                {/*    vehicle</p>*/}

                <div className="bottom-content">
                  <small>
                    {product.km === null ? (
                      ""
                    ) : (
                      <strong title="Author" className="kilometer">
                        <i className="fa fa-dashboard"></i>
                        &nbsp;
                        {product.category == "car" || product.category == "bike"
                          ? product.km + "km"
                          : product.description}
                      </strong>
                    )}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <strong title="Author" className="kilometer">
                      <i className="fa fa-cube"></i> &nbsp;
                      {product.color}
                    </strong>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {/*<strong title="Views"><i*/}
                    {/*    className="fa fa-cog"></i> Manual</strong>*/}
                  </small>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
