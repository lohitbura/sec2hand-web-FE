import React, { useState } from "react";
import { Formik } from "formik";
import { Button, TextField } from "@material-ui/core";
import { createDonationAPI } from "../../store/actions/donation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DonationImage from "../../assets/images/donation_image.png";

export default function Donate() {
  const [images, setImages] = useState([]);

  const submitForm = (values) => {
    console.log(values);
    let form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("address", values.address);
    form_data.append("pincode", values.pincode);
    form_data.append("contact", values.contact);
    form_data.append("description", values.description);

    for (let i = 0; i < images.length; i++) {
      form_data.append("images", images[i]);
    }

    createDonationAPI(form_data).then(() => {
      console.log("success");
    });
  };

  const handleImage = (e) => {
    const file = e.target.files;
    // if (file.length > 10) {
    //   toast.error("You can not select more then 10 images");
    // }
    let product_images = [];
    for (let i = 0; i < file.length; i++) {
      product_images.push(e.target.files[i]);
    }
    setImages(e.target.files);
  };
  return (
    <div>
      <h1></h1>
      <ToastContainer position="bottom-right" />
      <img style={{ width: "100%" }} src={DonationImage} />
      <div style={{marginTop: 50, display: 'flex', justifyContent: 'center'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Formik
                initialValues={{
                  name: "",
                  address: "",
                  pincode: "",
                  contact: "",
                  description: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = "This Field is required";
                  }
                  if (!values.address) {
                    errors.address = "This Field is required";
                  }
                  if (!values.pincode) {
                    errors.pincode = "This Field is required";
                  }
                  if (!values.contact) {
                    errors.contact = "This Field is required";
                  }
                  if (!values.description) {
                    errors.description = "This Field is required";
                  }
                  return errors;
                }}
                onSubmit={(values) => {
                  submitForm(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form>
                    <TextField
                      variant="outlined"
                      name="name"
                      label="Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      fullWidth
                      style={styles.inputStyle}
                    />
                    {errors.name && touched.name && errors.name}
                    <TextField
                      variant="outlined"
                      name="address"
                      label="Address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      fullWidth
                      style={styles.inputStyle}
                    />
                    {errors.address && touched.address && errors.address}
                    <TextField
                      variant="outlined"
                      name="pincode"
                      label="Pincode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.pincode}
                      fullWidth
                      style={styles.inputStyle}
                    />
                    {errors.pincode && touched.pincode && errors.pincode}
                    <TextField
                      variant="outlined"
                      name="contact"
                      label="Contact"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.contact}
                      fullWidth
                      style={styles.inputStyle}
                    />
                    {errors.contact && touched.contact && errors.contact}
                    <TextField
                      variant="outlined"
                      name="description"
                      label="Description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      fullWidth
                      style={styles.inputStyle}
                    />
                    {errors.description &&
                      touched.description &&
                      errors.description}

                    <input
                      type="file"
                      name="image"
                      multiple
                      onChange={handleImage}
                      required
                    />
                    <br></br>
                    <div style={{ textAlign: "center" }}>
                      <Button
                        size="large"
                        onClick={handleSubmit}
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: 20, width: 156 }}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  inputStyle: {
    marginBottom: 20,
  },
};
