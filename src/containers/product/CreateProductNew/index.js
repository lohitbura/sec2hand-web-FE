import React, { useState } from "react";
import { Button, Checkbox, Form, TextArea } from "semantic-ui-react";
import CarForm from "./carForm";
import BikeForm from "./bikeForm";
import BookForm from "./bookForm";
import MobileForm from "./mobileForm";

export default function CreateProductNew() {
  const [selectedCategory, setSelectedCategory] = useState("car");

  const renderForm = () => {
    switch (selectedCategory) {
      case "car":
        return <CarForm />;
      case "motorcycle":
        return <BikeForm type="Bikes" />;
      case "scooter":
        return <BikeForm type="Scooters" />;
      case "book":
        return <BookForm />;
      case "mobile":
        return <MobileForm />;
    }
  };

  return (
    <div style={{ width: "40%", margin: "auto", marginTop: 50 }}>
      <Form.Field>
        <label>Product category</label>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="type"
          className="form-control"
        >
          <option value="car">Car</option>
          <option value="motorcycle">Bike</option>
          <option value="scooter">Scooter</option>
          <option value="mobile">Mobile</option>
          <option value="book">Book</option>
          <option value="electronic">Electronic</option>
          <option value="property">Property</option>
          <option value="furniture">Furniture</option>
          <option value="sport">Sport</option>
        </select>
      </Form.Field>

      <div>{renderForm()}</div>
    </div>
  );
}
