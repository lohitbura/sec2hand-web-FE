import React from "react";
import { Link } from "react-router-dom";
import { URL } from "../../../store/constants";

function DealerPropertyComponents({ id, slug, name, price, details, image }) {
  return (
    <div style={{ width: "100%" }} className="dealer_per_product">
      <Link to={`/product/${slug}`}>
        <div className="dealer_product_image_div">
          <img src={`${URL}${image}`} alt="property" />
        </div>
      </Link>
      <div className="product_inner_div">
        <h3>
          <Link to={`/product/${id}`}>{name}</Link>
        </h3>
        <span>₹ {price} </span>
        <p>{details?.slice(0, 25)}...</p>
      </div>
    </div>
  );
}

export default DealerPropertyComponents;
