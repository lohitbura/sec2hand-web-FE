import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { styled, TextField } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#5b1c03",
  color: "#fff",
  fontSize: "18px",
  marginLeft: "0",
  "&:hover": {
    backgroundColor: "#4b1a07",
  },
  marginTop: "15px",
}));

function DealerSell() {
  const [inc, setInc] = useState(0);
  const [incB, setIncB] = useState(0);
  const [images, setImages] = useState([]);

  const handleImage = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      // add an "id" property to each File object
      setImages((prevState) => [...prevState, newFile]);
    }
  };
  const Incriment = (e) => {
    e.preventDefault();
    if (inc < 10) {
      setInc(inc + 1);
    }
  };
  const decriment = (e) => {
    e.preventDefault();
    if (inc > 0) {
      setInc(inc - 1);
    }
  };
  const incrimentB = (e) => {
    e.preventDefault();
    if (incB < 10) {
      setIncB(incB + 1);
    }
  };
  const decrimentB = (e) => {
    e.preventDefault();
    if (incB > 0) {
      setIncB(incB - 1);
    }
  };
  return (
    <div className="dealer_sell_main_div">
      <ToastContainer position="bottom-right" />
      <div className="dealer_sell_edit_div">
        <h3>General Details </h3>
        <form action="">
          <label htmlFor="#dealer_title">Title</label>
          <input
            type="text"
            id="dealer_title"
            placeholder="Title"
            className="dealer_edit_input"
          />
          <label htmlFor="#dealer_price">Price </label>
          <input
            type="number"
            id="dealer_price"
            placeholder="Price"
            className="dealer_edit_input"
          />
          <label htmlFor="#dealer_type">Type</label>
          <select name="" id="dealer_type" className="dealer_edit_input">
            <option value="">House apartment</option>
            <option value=""> Land plot </option>
            <option value="">Office Shop </option>
          </select>

          <label htmlFor="#dealer_description">Description</label>
          <textarea
            rows={5}
            type="text"
            id="dealer_description"
            placeholder="Description"
            className="dealer_edit_input"
          ></textarea>
          <label htmlFor="#dealer_property_type">Property type</label>
          <select
            name=""
            id="dealer_property_type"
            className="dealer_edit_input"
          >
            <option value="">Apartments</option>
            <option value=""> Builder Floors </option>
            <option value="">Farm Houses </option>
            <option value="">Houses & Villas </option>
          </select>
          <label htmlFor="#dealer_property_furnishing">Furnishing</label>
          <select
            name=""
            id="dealer_property_furnishing"
            className="dealer_edit_input"
          >
            <option value="">Furnished</option>
            <option value=""> Semi-Furnished </option>
            <option value="">Unfurnished </option>
          </select>
          <label htmlFor="#dealer_property_facing">Facing</label>
          <select
            name=""
            id="dealer_property_facing"
            className="dealer_edit_input"
          >
            <option value="">North </option>
            <option value=""> East </option>
            <option value="">South </option>
            <option value="">West </option>
            <option value="">North East </option>
            <option value="">South East </option>
            <option value="">South West</option>
            <option value="">North West </option>
          </select>
          <label htmlFor="#dealer_bedroom">Bedrooms</label>
          <div className="increment_div">
            <button onClick={decriment}>-</button>

            <input
              id="dealer_bedroom"
              type="number"
              max={10}
              min={0}
              value={inc}
            />
            <button onClick={Incriment}>+</button>
          </div>
          <label htmlFor="#dealer_bedroom">Bathrooms</label>
          <div className="increment_div">
            <button onClick={decrimentB}>-</button>

            <input
              id="dealer_bedroom"
              type="number"
              max={10}
              min={0}
              value={incB}
            />
            <button onClick={incrimentB}>+</button>
          </div>
          <label htmlFor="#dealer_area">Super Area </label>
          <input
            type="number"
            id="dealer_area"
            placeholder="Super Area"
            className="dealer_edit_input"
          />
          <label htmlFor="#dealer_carpet_area">Carpet Area </label>
          <input
            type="number"
            id="dealer_carpet_area"
            placeholder="Carpet Area"
            className="dealer_edit_input"
          />
          <label htmlFor="#dealer_floors">Total Floors </label>
          <input
            type="number"
            id="dealer_floors"
            placeholder="Total Floors"
            className="dealer_edit_input"
          />
          <label htmlFor="#dealer_car">Car Parking </label>
          <input
            type="number"
            id="dealer_car"
            placeholder="Car Parking"
            className="dealer_edit_input"
          />
          <label htmlFor="#dealer_property_status">Construction Status</label>
          <select
            name=""
            id="dealer_property_status"
            className="dealer_edit_input"
          >
            <option value="">New Launch </option>
            <option value=""> Ready to Move </option>
            <option value="">Under Construction </option>
          </select>
          <label htmlFor="#dealer_images">Property Images </label>
          <input
            type="file"
            id="dealer_images"
            multiple
            className="dealer_edit_input"
          />
          <ColorButton variant="contained">Add Products</ColorButton>
        </form>
      </div>
    </div>
  );
}

export default DealerSell;
