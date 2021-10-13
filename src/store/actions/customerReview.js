import axios from "axios";
import * as API_URL from "../constants";
import { header } from "../utility";
import { toast } from "react-toastify";

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

export const createCustomerMessageAPI = async (data) => {
  try {
    let response = await axios.post(API_URL.createCustomerMessageURL, data);
    if (response.status == 200) {
      toast.success("Message sent");
    }
  } catch (err) {
    throw err;
  }
};
