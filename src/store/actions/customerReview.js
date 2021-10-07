import axios from "axios";
import * as API_URL from "../constants";
import { header } from "../utility";

export const customerReviewListAPI = async () => {
  try {
    let response = await axios.get(API_URL.fetchCustomerReviewURL);
    if (response.status == 200) {
      return response.data;
    }
  } catch (err) {
    throw err;
  }
};
