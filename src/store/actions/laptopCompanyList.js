import axios from "axios";
import { laptopCompanyListURL } from "../constants";

export const fetchLaptopCompanyListAPI = async () => {
  try {
    let response = await axios.get(laptopCompanyListURL);
    if (response.status == 200) {
      return response.data;
    }
  } catch (err) {
    throw err;
  }
};
