import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Checkbox, Form, TextArea } from "semantic-ui-react";
import { fetchBrandListAPI } from "../../../store/actions/brands";
import { createNewProductAPI } from "../../../store/actions/product";
import { Description } from "@material-ui/icons";

export default function ElectronicForm() {
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

    for (let i = 0; i < images.length; i++) {
      form_data.append("images", images[i]);
    }

    createNewProductAPI("electronic", form_data);
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
                name="type"
                className="form-control"
                required
              >
                <option></option>
                <option value="laptop">Laptop</option>
                <option value="camera">Camera</option>
                <option value="games">Games</option>
                <option value="fridge">Fridget</option>
                <option value="ac">Ac</option>
                <option value="washing-machine">Washing machine</option>
                <option value="printer">Printer</option>
                <option value="tv">Tv</option>
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
