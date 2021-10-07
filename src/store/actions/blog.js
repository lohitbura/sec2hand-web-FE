import axios from "axios";
import * as API_URL from "../constants";
import { header } from "../utility";
import { toast } from "react-toastify";

export const fetchBlogAPI = async () => {
  try {
    let response = await axios.get(API_URL.fetchBlogURL);
    if (response.status == 200) {
      return response.data;
    }
  } catch (err) {
    throw err;
  }
};

export const blogDetailAPI = async (id) => {
  try {
    let response = await axios.get(API_URL.fetchBlogDetailURL(id));
    if (response.status == 200) {
      return response.data;
    }
  } catch (err) {
    throw err;
  }
};
