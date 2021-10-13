import axios from "axios";
import * as actionTypes from "./actionTypes";
import { cityListURL } from "../constants";

export const fetchSuccess = (data) => {
  return {
    type: actionTypes.FETCH_PRODUCT,
    data: data,
  };
};

export const searchProduct = (value) => {
  return (dispatch) => {
    dispatch(fetchSuccess(value));
  };
};
