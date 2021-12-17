import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";

import Button from "@material-ui/core/Button";
import { styled, TextField } from "@material-ui/core";

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

function DealerProfile() {
  const [editDiv, setEditDiv] = useState(false);

  return (
    <div className="dealer_profile_main_div">
      <div className="profile_pic_div">
        <div>
          <img
            src="../assets/images/customer1.png"
            alt="dealer profile"
            className="profile_pic_image"
          />
        </div>
      </div>
      <div className="dealer_profile_details_div">
        <div className="dealer_phone_div">
          <FaIcons.FaUserAlt className="dealer_phone_icon" />{" "}
          <h2>Dealer Name</h2>
        </div>

        <div className="dealer_phone_div">
          <FaIcons.FaPhoneAlt className="dealer_phone_icon" />{" "}
          <h2>Dealer phone</h2>
        </div>
        <div className="dealer_address_div">
          <FaIcons.FaMapMarkerAlt className="dealer_phone_icon" />{" "}
          <h3>Dealer Address</h3>
        </div>
        <div className="dealer_button_div">
          <FaIcons.FaEdit className="dealer_phone_icon" />{" "}
          <ColorButton variant="contained" onClick={() => setEditDiv(!editDiv)}>
            Edit Info
          </ColorButton>
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
    </div>
  );
}

export default DealerProfile;
