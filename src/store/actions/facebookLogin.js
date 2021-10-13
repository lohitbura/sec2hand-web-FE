import axios from "axios";
import { URL } from "../constants";

const facebookLogin = (accesstoken) => {
  axios
    .post(`${URL}/auth/convert-token`, {
      token: accesstoken,
      backend: "facebook",
      grant_type: "convert_token",
      client_id: "LAYEmsj5pB7TVtjMSHb9WUTCZA2SPECFrgdcUgJl",
      client_secret:
        "uzvdXwS2zVnLM96eI16Im2RMclfMRw0zCEMK5dMwV2uuwrON4x8SKqNjUbmleSa1Y4lkzgBXPd4Bl3nq1CfTnhdqD9jbEqT4L2SYbzRGE2gFqrVx7vKmmt0WJmQbcTOS",
    })
    .then((res) => {
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
    });
};

export default facebookLogin;
