import React, { useState } from "react";
import RangeSlider from "../../containers/slider/Rangeslider";

export default function PriceRangeFilter({ onChange }) {
  const [range, setRange] = useState();
  const submitRange = () => {
    let data = {
      price: range,
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

      <div className="text-center mt-5">
        <button onClick={submitRange} className="searchBtn">
          Search
        </button>
      </div>
    </div>
  );
}
