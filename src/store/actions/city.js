import axios from "axios";
import * as actionTypes from "./actionTypes";
import { cityListURL } from "../constants";

export const fetchSuccess = (data) => {
  return {
    type: actionTypes.FETCH_SELECTED_CITY,
    data: data,
  };
};

export const postCity = (value) => {
  return (dispatch) => {
    dispatch(fetchSuccess(value));
  };
};
