import axios from "axios";
import * as API_URL from "../constants";
import { header } from "../utility";

export const fetchFeaturedProductListAPI = async (offset, city) => {
  try {
    let response = await axios.get(
      API_URL.fetchFeaturedProductListURL(offset, city),
      header()
    );
    if (response.status == 200) {
      let data = response.data.results;
      let array_data = [
        ...data.Car,
        ...data.Bike,
        ...data.Book,
        ...data.Mobile,
        ...data.Furniture,
        ...data.Property,
        ...data.Sport,
        ...data.Electronic,
      ];
      return {
        data: array_data.sort(() => Math.random() - 0.5),
        has_more: response.data.next != null ? true : false,
      };
    }
  } catch (err) {
    throw err;
  }
};

export const fetchProductListAPI = async (data) => {
  try {
    let response = await axios.get(
      API_URL.productListURL(),
      { params: data },
      header()
    );
    if (response.status == 200) {
      return {
        data: response.data.products,
        has_more: response.data.has_more,
      };
    }
  } catch (err) {
    throw err;
  }
};
