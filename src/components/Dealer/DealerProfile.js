import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";

import Button from "@material-ui/core/Button";
import { styled, TextField } from "@material-ui/core";
import DealerPropertyComponents from "./components/DealerPropertyComponents";
import { getUserProfileURL } from "../../store/constants";
import { header } from "../../store/utility";
import axios from "axios";
import { Link } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#5b1c03",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#4b1a07",
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#5b1c03",
  marginTop: "1.4rem",
  borderRadius: "30px",
  color: "#fff",
  fontSize: "1.2rem",
  "&:hover": {
    backgroundColor: "#4b1a07",
  },
}));

function DealerProfile({ dealer }) {
  const [editDiv, setEditDiv] = useState(false);
  const [userCat, setUserCat] = useState("user");
  const [profile, setProfile] = useState({});
  const [loader, setLoader] = useState(false);

  const fetchProfile = () => {
    const token = localStorage.getItem("token");
    let headers;
    if (token) {
      headers = {
        Authorization: `Token ${token}`,
      };
    } else {
      headers = {};
    }
    setLoader(true);

    axios
      .get(getUserProfileURL(), header())
      .then((res) => {
        console.log("i am profile ", res);
        setProfile(res.data);
        setLoader(false);
        localStorage.setItem("category", res.data.category);
        setUserCat(res.data.category);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  useEffect(() => {
    setUserCat(localStorage.getItem("category"));
    fetchProfile();
    return () => {};
  }, []);
  console.log(userCat);
  return (
    <div className="dealer_profile_main_div">
      <div className="profile_pic_div">
        <div>
          <img
            src={profile?.image}
            alt={profile?.user}
            className="profile_pic_image"
          />
        </div>
      </div>
      <div className="dealer_profile_details_div">
        <div className="dealer_phone_div">
          <FaIcons.FaUserAlt className="dealer_phone_icon" />{" "}
          <h2>{profile?.user} </h2>
        </div>

        <div className="dealer_phone_div">
          <FaIcons.FaPhoneAlt className="dealer_phone_icon" />{" "}
          <h2> {profile?.phone} </h2>
        </div>
        {dealer && (
          <div className="dealer_address_div">
            <FaIcons.FaMapMarkerAlt className="dealer_phone_icon" />{" "}
            <h3> {profile?.address} </h3>
          </div>
        )}

        <div className="dealer_button_div">
          <FaIcons.FaEdit className="dealer_phone_icon" />{" "}
          <Link to="/profile-edit">
            <ColorButton
              variant="contained"
              // onClick={() => setEditDiv(!editDiv)}
            >
              Edit Info
            </ColorButton>
          </Link>
        </div>
      </div>
      <div
        className={`${
          editDiv
            ? "dealer_profile_edit_div dealer_profile_edit_div_active "
            : "dealer_profile_edit_div dealer_profile_edit_div_hide"
        }`}
      >
        <form action="">
          <center>
            {" "}
            <h2>Edit Info</h2>
          </center>
          <label htmlFor="#dealer_name">Name</label>
          <input
            type="text"
            id="dealer_name"
            placeholder="Name"
            className="dealer_edit_input"
          />
          <label htmlFor="#dealer_phone">Phone</label>
          <input
            type="number"
            id="dealer_phone"
            placeholder="Phone"
            className="dealer_edit_input"
          />
          <label htmlFor="#dealer_Add">Address</label>
          <input
            type="text"
            id="dealer_Add"
            placeholder="Address"
            className="dealer_edit_input"
          />
          <SaveButton variant="contained">Save</SaveButton>
        </form>
      </div>
      <div className="dealer_products_div">
        {userCat == "property" && dealer
          ? profile?.products?.map((product) => (
              <div className="dealer_product">
                <DealerPropertyComponents
                  id={product?.id}
                  slug={product?.slug}
                  name={product?.title}
                  price={product?.price}
                  details={product?.description}
                  image={product?.images[0]?.image}
                />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default DealerProfile;
