import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Checkbox, Form, TextArea } from "semantic-ui-react";
import { fetchBrandListAPI } from "../../../store/actions/brands";
import { createNewProductAPI } from "../../../store/actions/product";

export default function BikeForm({ type }) {
  const [brandList, setBrandList] = useState();
  const [modelList, setModelList] = useState();
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);

  const [brand, setBrand] = useState();

  const [images, setimages] = useState();

  useEffect(() => {
    if (!brand) {
      fetchBrandListAPI({ type: type }).then((res) => {
        setBrandList(res);
      });
    } else {
      fetchBrandListAPI({ type: type, brand_name: brand }).then((res) => {
        setModelList(res);
      });
    }
  }, [brand]);

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
    form_data.append("brand", brand);
    form_data.append("model", values.model);
    form_data.append("year", values.year);
    form_data.append("km", values.km);
    form_data.append("plate_number", values.plate_number);
    form_data.append("mobile_number", values.mobile_number);
    form_data.append("insurance_date", values.insurance_date);
    form_data.append("number_of_owners", values.number_of_owners);

    for (let i = 0; i < images.length; i++) {
      form_data.append("images", images[i]);
    }

    createNewProductAPI("bike", form_data);
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
              <label>Brand</label>
              {!checked1 ? (
                <select
                  onChange={(e) => setBrand(e.target.value)}
                  name="brand"
                  className="form-control"
                  required
                >
                  <option>Select Brand</option>

                  {brandList &&
                    brandList.map((city) => {
                      return <option value={city.Brand}>{city.Brand}</option>;
                    })}
                </select>
              ) : (
                <input
                  type="text"
                  onChange={(e) => setBrand(e.target.value)}
                  name="brand"
                  placeholder="Enter your product brand"
                  required
                />
              )}
            </Form.Field>
            <Form.Field>
              <span style={{ marginRight: "10px" }}>
                Add Brand(if your model not present in the list)
              </span>
              <input
                type="checkbox"
                onChange={() => setChecked1(!checked1)}
                checked={checked1}
              />
            </Form.Field>

            <Form.Field>
              <label>Model</label>
              {!checked ? (
                <select
                  onChange={handleChange}
                  name="model"
                  className="form-control"
                  required
                >
                  <option>Select Model</option>

                  {modelList &&
                    modelList.map((city) => {
                      return <option value={city.Model}>{city.Model}</option>;
                    })}
                </select>
              ) : (
                <input
                  type="text"
                  name="model"
                  onChange={handleChange}
                  required
                  placeholder="Enter your product model"
                />
              )}
            </Form.Field>
            <Form.Field>
              <span style={{ marginRight: "10px" }}>
                Add Model(if your model not present in the list)
              </span>
              <input
                type="checkbox"
                onChange={() => setChecked(!checked)}
                checked={checked}
              />
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
              <label>Km</label>
              <input
                type="number"
                name="km"
                onChange={handleChange}
                placeholder="Km"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Year</label>
              <input
                type="number"
                name="year"
                onChange={handleChange}
                placeholder="Year"
                required
              />
            </Form.Field>

            <Form.Field>
              <label>Plate number</label>
              <input
                type="text"
                name="plate_number"
                onChange={handleChange}
                placeholder="Plate number"
                required
              />
            </Form.Field>

            <Form.Field>
              <label>Insurance number</label>
              <input
                type="date"
                name="insurance_date"
                onChange={handleChange}
                placeholder="Insurance date"
                required
              />
            </Form.Field>

            <Form.Field>
              <label>Number of owners</label>
              <input
                type="number"
                name="number_of_owners"
                onChange={handleChange}
                placeholder="Number of owners"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Mobile number</label>
              <input
                type="text"
                name="mobile_number"
                onChange={handleChange}
                placeholder="Mobile number"
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
