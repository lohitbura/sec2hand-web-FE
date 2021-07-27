import React, { useEffect, useState } from "react";
import RangeSlider from "../../containers/slider/Rangeslider";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { fetchLaptopCompanyListAPI } from "../../store/actions/laptopCompanyList";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { PROCESSOR_TYPE } from "../../services/data";

export default function LaptopFilter({ onChange }) {
  const [range, setRange] = useState();
  const [company, setCompany] = useState();
  const [companyList, setCompanyList] = useState([]);
  const [ram, setRam] = useState();
  const [processor, setProcessor] = useState();
  const [storage, setStorage] = useState();
  const [screenType, setScreenType] = useState();
  const [bodyType, setBodyType] = useState();

  useEffect(() => {
    fetchLaptopCompanyListAPI().then((res) => {
      let array = [];
      res.map((item) => {
        array.push(item.title);
      });

      setCompanyList(array);
    });
  }, []);

  const submitRange = () => {
    let data = {};
    data.price = range;
    data.company = company;
    data.ram = ram;
    data.processor = processor;
    data.ssd = storage;
    data.screen_type = screenType;
    data.body_type = bodyType;
    onChange(data);
  };

  return (
    <div className="filterHider">
      <div className="section-heading">
        <h2>Search by Filters</h2>
      </div>

      <div className="mt-5 ">
        <RangeSlider parentCallback={setRange} />
      </div>
      <div className="catagory mt-5">
        <InputLabel id="label">Company :</InputLabel>
        <Select
          labelId="label"
          id="select"
          onChange={(e) => setCompany(e.target.value)}
          name="productBrand"
          defaultValue="selectBrands"
        >
          <MenuItem value="selectBrands">Select Company</MenuItem>
          {companyList &&
            companyList.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
        </Select>
      </div>

      <div className="catagory mt-5">
        <InputLabel id="label">Processor :</InputLabel>
        <Select
          labelId="label"
          id="select"
          onChange={(e) => setProcessor(e.target.value)}
          name="productBrand"
          defaultValue="selectBrands"
        >
          <MenuItem value="selectBrands">Select Processor</MenuItem>
          {PROCESSOR_TYPE.map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
      </div>

      <br></br>
      <br></br>
      <FormControl component="fieldset">
        <Typography gutterBottom>Ram :</Typography>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={ram}
          onChange={(e) => setRam(e.target.value)}
        >
          <FormControlLabel value="2" control={<Radio />} label="2gb+ ram" />
          <FormControlLabel value="4" control={<Radio />} label="4gb+ ram" />
          <FormControlLabel value="8" control={<Radio />} label="8gb+ ram" />
          <FormControlLabel value="16" control={<Radio />} label="16gb+ ram" />
        </RadioGroup>
      </FormControl>

      <br></br>
      <br></br>
      <FormControl component="fieldset">
        <Typography gutterBottom>Storage Type :</Typography>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
        >
          <FormControlLabel value="True" control={<Radio />} label="SSD" />
          <FormControlLabel value="False" control={<Radio />} label="HDD" />
        </RadioGroup>
      </FormControl>

      <br></br>
      <br></br>
      <FormControl component="fieldset">
        <Typography gutterBottom>Screen Type :</Typography>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={screenType}
          onChange={(e) => setScreenType(e.target.value)}
        >
          <FormControlLabel value="LCD" control={<Radio />} label="LCD" />
          <FormControlLabel value="IPS" control={<Radio />} label="IPS" />
        </RadioGroup>
      </FormControl>

      <br></br>
      <br></br>
      <FormControl component="fieldset">
        <Typography gutterBottom>Body Type :</Typography>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={bodyType}
          onChange={(e) => setBodyType(e.target.value)}
        >
          <FormControlLabel
            value="Plastic"
            control={<Radio />}
            label="Plastic"
          />
          <FormControlLabel
            value="Metallic"
            control={<Radio />}
            label="Metallic"
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
