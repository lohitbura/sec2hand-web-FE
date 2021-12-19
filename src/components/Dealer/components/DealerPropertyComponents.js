import React from "react";

function DealerPropertyComponents({ id, name, price, details, image }) {
  return (
    <div style={{ width: "100%" }} className="dealer_per_product">
      <div className="dealer_product_image_div">
        <img src={image} alt="property" />
      </div>
      <div className="product_inner_div">
        <h3>{name}</h3>
        <span>₹ {price} </span>
        <p>{details}</p>
      </div>
    </div>
  );
}

export default DealerPropertyComponents;
