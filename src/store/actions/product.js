import axios from "axios";
import { toast } from "react-toastify";
import * as API_URL from "../constants";
import { header } from "../utility";

export const fetchFeaturedProductListAPI = async (offset, city) => {
  try {
    let response = await axios.get(
      API_URL.fetchFeaturedProductListURL(offset, city)
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
    let response = await axios.get(API_URL.productListURL(), { params: data });
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

const fetchProductUrl = (type) => {
  switch (type) {
    case "car":
      return API_URL.createCarProductURL;
    case "bike":
      return API_URL.createBikeProductURL;
    case "mobile":
      return API_URL.createMobileProductURL;
    case "sport":
      return API_URL.createSportProductURL;
    case "electronic":
      return API_URL.createElectronicProductURL;
    case "property":
      return API_URL.createPropertyProductURL;
    case "book":
      return API_URL.createBookProductURL;
    case "furniture":
      return API_URL.createFurnitureProductURL;
  }
};

export const createNewProductAPI = async (type, data) => {
  try {
    let response = await axios.post(fetchProductUrl(type), data);
    if (response.status == 201) {
      toast.success("Product submit");
    }
  } catch (err) {
    throw err;
  }
};
