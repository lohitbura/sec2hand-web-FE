import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Checkbox, Form, TextArea } from "semantic-ui-react";
import { fetchBrandListAPI } from "../../../store/actions/brands";
import { createNewProductAPI } from "../../../store/actions/product";
import { Description, Apartment } from "@material-ui/icons";

export default function PropertyForm() {
  const [images, setimages] = useState();

  const handleImage = (e) => {
    const file = e.target.files;
    if (file.length > 10) {
      toast.error("You can not select more then 10 images");
    }
    let product_images = [];
    for (let i = 0; i < file.length; i++) {
      product_images.push(e.target.files[i]);
    }
    setimages({ images: e.target.files });
  };

  const submitForm = (values) => {
    let form_data = new FormData();
    if (images.length > 10) {
      return toast.error("You can not select more 10 images");
    }

    form_data.append("price", values.price);
    form_data.append("title", values.title);
    form_data.append("description", values.description);
    form_data.append("type", values.type);
    form_data.append("property_type", values.property_type);
    form_data.append("bed_room", values.bed_room);
    form_data.append("bathroom", values.bathroom);
    form_data.append("furnishing", values.furnishing);
    form_data.append("construction_status", values.construction_status);
    form_data.append("super_area", values.super_area);
    form_data.append("carpet_area", values.carpet_area);
    form_data.append("total_floors", values.carpet_area);
    form_data.append("car_parking", values.car_parking);
    form_data.append("facing", values.facing);

    for (let i = 0; i < images.length; i++) {
      form_data.append("images", images[i]);
    }

    createNewProductAPI("property", form_data);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          submitForm(values);
        }}
      >
        {({ values, setFieldValue, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Type</label>
              <select
                onChange={handleChange}
                name="property_type"
                className="form-control"
                required
              >
                <option></option>
                <option value="house_apartment">House apartment</option>
                <option value="land_plot">Land plot</option>
                <option value="office_shop">Office shop</option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input
                type="number"
                name="price"
                onChange={handleChange}
                placeholder="Price"
                required
              />
            </Form.Field>

            <Form.Field>
              <label>Title</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                required
              />
            </Form.Field>

            <Form.Field>
              <label>Description</label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                placeholder="Description"
                required
              />
            </Form.Field>

            <Form.Field>
              <label>Bed room</label>
              <input
                type="number"
                name="bed_room"
                onChange={handleChange}
                placeholder="Bed room"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Bathroom</label>
              <input
                type="number"
                name="bathroom"
                onChange={handleChange}
                placeholder="Bathroom"
                required
              />
            </Form.Field>

            <Form.Field>
              <label>Furnishing</label>
              <select
                onChange={handleChange}
                name="furnishing"
                className="form-control"
                required
              >
                <option></option>
                <option value="Furnished">Furnished</option>
                <option value="Non-Furnished">Non-Furnished</option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>Construction status</label>
              <select
                onChange={handleChange}
                name="construction_status"
                className="form-control"
                required
              >
                <option></option>
                <option value="new">New</option>
                <option value="old">Old</option>
              </select>
            </Form.Field>

            <Form.Field>
              <label>Super area</label>
              <input
                type="number"
                name="super_area"
                onChange={handleChange}
                placeholder="Super area"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Carpet area</label>
              <input
                type="number"
                name="carpet_area"
                onChange={handleChange}
                placeholder="Carpet area"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Total floors</label>
              <input
                type="number"
                name="total_floors"
                onChange={handleChange}
                placeholder="Total floors"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Car parking</label>
              <input
                type="number"
                name="car_parking"
                onChange={handleChange}
                placeholder="Car parking"
                required
              />
            </Form.Field>

            <Form.Field>
              <label>Type</label>
              <select
                onChange={handleChange}
                name="facing"
                className="form-control"
                required
              >
                <option></option>
                <option value="east">East</option>
                <option value="west">West</option>
                <option value="north">North</option>
                <option value="south">South</option>
              </select>
            </Form.Field>

            <Form.Field>
              <label>Image(limit upto 10 images)</label>
              <input
                type="file"
                name="image"
                multiple
                onChange={handleImage}
                required
              />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
