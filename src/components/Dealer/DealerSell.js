import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { styled, TextField } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { createNewProductAPI } from "../../store/actions/product";
import { useForm } from "../../helpers/hooks";
import axios from "axios";
import { createNewPropertyUrl } from "../../store/constants";
import { header } from "../../store/utility";

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
  const [images, setImages] = useState();

  const handleImage = (e) => {
    e.preventDefault();
    const file = e.target.files;
    if (file.length > 10) {
      return toast.error("You can not select more then 10 images");
    } else {
      setImages(e.target.files);
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
  const handleAddProperty = async () => {
    const price = parseInt(values.price);
    const super_area = parseInt(values.super_area);
    const carpet_area = parseInt(values.carpet_area);
    const total_floors = parseInt(values.total_floors);
    const car_parking = parseInt(values.car_parking);
    const bathroom = parseInt(incB);
    const bed_room = parseInt(inc);
    let form_data = new FormData();

    let all_data = {
      category: "property",
      price,
      title: values.title,
      description: values.description,
      type: values.type,
      property_type: values.property_type,
      furnishing: values.furnishing,
      construction_status: values.construction_status,
      super_area,
      carpet_area: values.carpet_area,
      total_floors,
      car_parking: values.car_parking,
      facing: values.facing,
      images,
      bathroom,
      bed_room,
    };
    form_data.append("price", price);
    form_data.append("title", values.title);
    form_data.append("description", values.description);
    form_data.append("type", values.type);
    form_data.append("property_type", values.property_type);
    form_data.append("bed_room", bed_room);
    form_data.append("bathroom", bathroom);
    form_data.append("furnishing", values.furnishing);
    form_data.append("construction_status", values.construction_status);
    form_data.append("super_area", super_area);
    form_data.append("carpet_area", values.carpet_area);
    form_data.append("total_floors", total_floors);
    form_data.append("car_parking", values.car_parking);
    form_data.append("facing", values.facing);
    form_data.append("category", "property");
    for (let i = 0; i < images?.length; i++) {
      form_data.append("images", images[i]);
    }

    // for (var key of form_data.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }
    // createNewPropertyUrl  url for axios
    if (values.type) {
      try {
        let response = await axios.post(
          createNewPropertyUrl,
          form_data,
          header()
        );
        if (response.status == 201) {
          setValues(baseValues);
          setInc(0);
          setIncB(0);
          setImages([]);
          toast.success("Product submit");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.success("Please fill all required field");
    }
  };

  const { onChange, onSubmit, values, setValues, baseValues } = useForm(
    handleAddProperty,
    {
      title: "",
      price: 0,
      description: "",
      type: "",
      property_type: "",
      furnishing: "",
      construction_status: "",
      super_area: 0,
      carpet_area: 0,
      total_floors: 0,
      car_parking: 0,
      facing: "",
    }
  );
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
            name="title"
            value={values.title}
            onChange={onChange}
            placeholder="Title"
            className="dealer_edit_input"
          />
          <label htmlFor="#dealer_price">Price </label>
          <input
            type="number"
            id="dealer_price"
            placeholder="Price"
            name="price"
            value={values.price}
            onChange={onChange}
            className="dealer_edit_input"
          />
          <label htmlFor="#dealer_type">Type</label>
          <select
            name="type"
            value={values.type}
            onChange={onChange}
            id="dealer_type"
            className="dealer_edit_input"
          >
            <option value=""></option>
            <option value="house_apartment">House apartment</option>
            <option value="land_plot"> Land plot </option>
            <option value="office_shop">Office Shop </option>
          </select>

          <label htmlFor="#dealer_description">Description</label>
          <textarea
            rows={5}
            name="description"
            value={values.description}
            onChange={onChange}
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
            name="property_type"
            value={values.property_type}
            onChange={onChange}
          >
            <option value=""></option>

            <option value="Apartments">Apartments</option>
            <option value="Builder Floors"> Builder Floors </option>
            <option value="Farm Houses">Farm Houses </option>
            <option value="Houses & Villas">Houses & Villas </option>
          </select>
          <label htmlFor="#dealer_property_furnishing">Furnishing</label>
          <select
            name=""
            id="dealer_property_furnishing"
            className="dealer_edit_input"
            name="furnishing"
            value={values.furnishing}
            onChange={onChange}
          >
            <option value=""></option>

            <option value="Furnished">Furnished</option>
            <option value="Semi-Furnished"> Semi-Furnished </option>
            <option value="Unfurnished">Unfurnished </option>
          </select>
          <label htmlFor="#dealer_property_facing">Facing</label>
          <select
            name=""
            id="dealer_property_facing"
            className="dealer_edit_input"
            name="facing"
            value={values.facing}
            onChange={onChange}
          >
            <option value=""></option>

            <option value="north">North </option>
            <option value="east"> East </option>
            <option value="south">South </option>
            <option value="west">West </option>
            <option value="north east">North East </option>
            <option value="south east">South East </option>
            <option value="south west">South West</option>
            <option value="north west">North West </option>
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
            name="super_area"
            value={values.super_area}
            onChange={onChange}
          />
          <label htmlFor="#dealer_carpet_area">Carpet Area </label>
          <input
            type="number"
            id="dealer_carpet_area"
            placeholder="Carpet Area"
            className="dealer_edit_input"
            name="carpet_area"
            value={values.carpet_area}
            onChange={onChange}
          />
          <label htmlFor="#dealer_floors">Total Floors </label>
          <input
            type="number"
            id="dealer_floors"
            placeholder="Total Floors"
            className="dealer_edit_input"
            name="total_floors"
            value={values.total_floors}
            onChange={onChange}
          />
          <label htmlFor="#dealer_car">Car Parking </label>
          <input
            type="number"
            id="dealer_car"
            placeholder="Car Parking"
            className="dealer_edit_input"
            name="car_parking"
            value={values.car_parking}
            onChange={onChange}
          />
          <label htmlFor="#dealer_property_status">Construction Status</label>
          <select
            name=""
            id="dealer_property_status"
            className="dealer_edit_input"
            name="construction_status"
            value={values.construction_status}
            onChange={onChange}
          >
            <option value=""></option>
            <option value="New Launch">New Launch </option>
            <option value="Ready to Move"> Ready to Move </option>
            <option value="Under Construction">Under Construction </option>
          </select>
          <label htmlFor="#dealer_images">Property Images </label>
          <input
            type="file"
            id="dealer_images"
            multiple
            className="dealer_edit_input"
            onChange={handleImage}
          />
          <ColorButton variant="contained" type="submit" onClick={onSubmit}>
            Add Products
          </ColorButton>
        </form>
      </div>
    </div>
  );
}

export default DealerSell;
