import axios from "axios";
import * as API_URL from "../constants";
import { header } from "../utility";
import { toast } from "react-toastify";

export const fetchBrandListAPI = async (data) => {
  try {
    let response = await axios.post(API_URL.brandListURL, data, header());
    if (response.status == 200) {
      return response.data;
    }
  } catch (err) {
    throw err;
  }
};
