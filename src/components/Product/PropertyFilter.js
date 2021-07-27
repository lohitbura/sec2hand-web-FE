import React, { useState } from "react";
import RangeSlider from "../../containers/slider/Rangeslider";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";

export default function PropertyFilter({ onChange }) {
  const [range, setRange] = useState();
  const [type, setType] = React.useState();
  const [bedroom, setBedroom] = React.useState();
  const [bathroom, setBathroom] = React.useState();
  const [furnishing, setFurnishing] = React.useState();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const submitRange = () => {
    let data = {
      price: range,
      property_type: type,
      bed_room: bedroom,
      bathroom: bathroom,
      furnishing: furnishing,
    };
    onChange(data);
  };

  return (
    <div className="filterHider">
      <div className="section-heading">
        <h2>Search by Filters</h2>
      </div>
      <div className="mt-5 ">
        <RangeSlider parentCallback={(values) => setRange(values)} />
      </div>
      <br></br>
      <br></br>
      <FormControl component="fieldset">
        {/* <FormLabel component="legend">Type</FormLabel> */}
        <Typography gutterBottom>Type :</Typography>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={type}
          onChange={handleChange}
        >
          <FormControlLabel
            value="house_apartment"
            control={<Radio />}
            label="House Apartment"
          />
          <FormControlLabel
            value="land_plot"
            control={<Radio />}
            label="Land Plot"
          />
          <FormControlLabel
            value="office_shop"
            control={<Radio />}
            label="Office & shop"
          />
        </RadioGroup>
      </FormControl>
      <br></br>
      <br></br>
      <FormControl component="fieldset">
        {/* <FormLabel component="legend">Type</FormLabel> */}
        <Typography gutterBottom>Bedroom :</Typography>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={bedroom}
          onChange={(e) => setBedroom(e.target.value)}
        >
          <FormControlLabel value="1" control={<Radio />} label="1+ bedroom" />
          <FormControlLabel value="2" control={<Radio />} label="2+ bedroom" />
          <FormControlLabel value="3" control={<Radio />} label="3+ bedroom" />
          <FormControlLabel value="4" control={<Radio />} label="4+ bedroom" />
        </RadioGroup>
      </FormControl>

      <br></br>
      <br></br>
      <FormControl component="fieldset">
        {/* <FormLabel component="legend">Type</FormLabel> */}
        <Typography gutterBottom>Bathroom :</Typography>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={bathroom}
          onChange={(e) => setBathroom(e.target.value)}
        >
          <FormControlLabel value="1" control={<Radio />} label="1+ bathroom" />
          <FormControlLabel value="2" control={<Radio />} label="2+ bathroom" />
          <FormControlLabel value="3" control={<Radio />} label="3+ bathroom" />
          <FormControlLabel value="4" control={<Radio />} label="4+ bathroom" />
        </RadioGroup>
      </FormControl>

      <br></br>
      <br></br>
      <FormControl component="fieldset">
        {/* <FormLabel component="legend">Type</FormLabel> */}
        <Typography gutterBottom>Furnishing:</Typography>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={furnishing}
          onChange={(e) => setFurnishing(e.target.value)}
        >
          <FormControlLabel
            value="furnished"
            control={<Radio />}
            label="Furnished"
          />
          <FormControlLabel
            value="unfurnished"
            control={<Radio />}
            label="Unfurnished"
          />
          <FormControlLabel
            value="semi-furnished"
            control={<Radio />}
            label="Semi-Furnished"
          />
        </RadioGroup>
      </FormControl>

      <div className="text-center mt-5">
        <button onClick={submitRange} className="searchBtn">
          Search
        </button>
      </div>
    </div>
  );
}
