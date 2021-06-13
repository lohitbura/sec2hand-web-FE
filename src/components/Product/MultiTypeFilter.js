import React, { useState } from "react";
import RangeSlider from "../../containers/slider/Rangeslider";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import KmSlider from "../../containers/slider/KmSlider";
import YearSlider from "../../containers/slider/YearSlider";
import { BIKE_BRANDS, CAR_BRANDS, MOBILE_BRANDS } from "../../services/data";
import { useParams } from "react-router-dom";

export default function MultiTypeFilter({ onChange }) {
  const params = useParams();
  const [range, setRange] = useState();
  const [distance, setDistance] = useState();
  const [year, setYear] = useState();
  const [brand, setBrand] = useState();

  const BRANDS = () => {
    if (params.category == "car") {
      return CAR_BRANDS;
    }
    if (
      params.category == "bike" ||
      params.category == "scooter" ||
      params.category == "modified" ||
      params.category == "motorcycle"
    ) {
      return BIKE_BRANDS;
    }
    if (params.category == "mobile") {
      return MOBILE_BRANDS;
    }
  };

  const submitRange = () => {
    let data = {};
    if (range !== undefined) {
      data.price = range;
    }
    if (distance !== undefined) {
      data.distance = distance;
    }
    if (year !== undefined) {
      data.year = year;
    }
    if (brand !== undefined) {
      data.brand = brand;
    }
    onChange(data);
  };

  return (
    <div className="filterHider">
      <div className="section-heading">
        <h2>Search by Filters</h2>
      </div>
      <div className="catagory mt-5">
        <InputLabel id="label">Brands :</InputLabel>
        <Select
          labelId="label"
          id="select"
          onChange={(e) => setBrand(e.target.value)}
          name="productBrand"
          defaultValue="selectBrands"
        >
          <MenuItem value="selectBrands">Select Brands</MenuItem>
          {BRANDS().map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
      </div>
      <div className="mt-5 ">
        <RangeSlider parentCallback={setRange} />
      </div>
      {params.category !== "mobile" ? (
        <div>
          <div className=" mt-5">
            <KmSlider parentCallback={setDistance} />
          </div>
          <div style={{ marginTop: "40px" }}>
            <YearSlider parentCallback={setYear} />
          </div>
        </div>
      ) : null}

      <div className="text-center mt-5">
        <button onClick={submitRange} className="searchBtn">
          Search
        </button>
      </div>
    </div>
  );
}
