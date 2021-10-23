import axios from "axios";
import { URL } from "../constants";

const facebookLogin = (accesstoken) => {
  axios
    .post(`${URL}/auth/convert-token`, {
      token: accesstoken,
      backend: "facebook",
      grant_type: "convert_token",
      client_id: "M2B69qBgBPqPKWucddyvv2Vc73EmtGGCgkKV78g5",
      client_secret:
        "wXzhqlo8mCnH573GTE6guvvaKDiDEtBzxFFtJ0LeAX3572xi6uertqsjvvsFJOazytdD00uGr3lw65xqIOUKwNkktMqFhJDlFhNVS9J3pOCweSMCo92LZLMmuXSmaxus",
    })
    .then((res) => {
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
    });
};

export default facebookLogin;
