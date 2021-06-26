import axios from "axios";
import * as API_URL from "../constants";
import { header } from "../utility";
import { toast } from "react-toastify";

export const createDonationAPI = async (data) => {
  try {
    let response = await axios.post(
      API_URL.createDonationURL,
      data,
      header()
    );
    if (response.status == 201) {
      toast.success("Product submit");
    }
  } catch (err) {
    throw err;
  }
};
