import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { fetchCity } from "../../store/actions/cityList";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postCity } from "../../store/actions/city";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
}));

const CityFilter = ({ cityData, fetchCityList, postCity }) => {
  const classes = useStyles();
  const [place, setPlace] = React.useState("");
  const [data, setData] = React.useState("");

  const handleChange = (event) => {
    setPlace(event.target.value);
    localStorage.setItem("place", event.target.value);
    postCity(event.target.value);
  };

  useEffect(() => {
    if (cityData) {
      setData(cityData);
    }
  }, [cityData]);

  useEffect(() => {
    fetchCityList();
  }, []);

  return (
    <div style={{ backgroundColor: "#fff", borderRadius: 50 }}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Search place
        </InputLabel>
        <Select
        // style={{height:}}
        // style={{padding: '2px 3px'}}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={place}
          onChange={handleChange}
          label="Search place"
        >
          {data &&
            data.map((item) => {
              return <MenuItem value={item.name}>{item.name}</MenuItem>;
            })}
        </Select>
      </FormControl>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cityData: state.cityList.data,
    selectedCity: state.selectedCity.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCityList: () => dispatch(fetchCity()),
    postCity: (value) => dispatch(postCity(value)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CityFilter)
);
