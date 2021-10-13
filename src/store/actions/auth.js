import axios from "axios";
import * as actionTypes from "./actionTypes";
import {
  URL,
  customerRegisterURL,
  customerLoginURL,
  dealerRegisterURL,
  dealerLoginURL,
  customerVerifyOtpURL,
} from "../constants";
import { toast } from "react-toastify";
import customerVerifyOtp from "../../containers/customerVerifyOtp";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

let phone = "";
let session_id = "";

export const verifyOtp = (otp, history) => {
  return (dispatch) => {
    axios
      .post(`${customerVerifyOtpURL}`, { otp, session_id })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == true) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("token_type", "token");

          const expirationDate = new Date(
            new Date().getTime() + 24 * 60 * 60 * 1000
          );
          localStorage.setItem("expirationDate", expirationDate);
          dispatch(checkAuthTimeout(24 * 60 * 60));

          toast.success("OTP verified successful.");
          dispatch(authSuccess(token));
          history.push("/");
        } else {
          console.log(res.data.status);
          toast.error(res.data.detail);
        }
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const facebookLogin = (accesstoken, history) => {
  return (dispatch) => {
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
        const expirationDate = new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        );
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(checkAuthTimeout(24 * 60 * 60));
        dispatch(authSuccess(res.data.access_token));
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("token_type", "bearer");
        history.push("/");

        // localStorage.setItem("refresh_token", res.data.refresh_token);
      });
  };
};

export const authLogin = (username, history) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${customerLoginURL}`, {
        phone: username,
      })
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status == true) {
          phone = res.data.phone;
          session_id = res.data.session_id;
          toast.success("OTP sent to your registered number");
          history.push("/customer-verify-otp");
        } else {
          dispatch(authFail(res));
          toast.error(res.data.details);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data.message);
        }
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, phone, history) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${customerRegisterURL}`, {
        username: username,
        phone: phone,
      })
      .then((res) => {
        if (res.data.status == true) {
          phone = res.data.phone;
          session_id = res.data.session_id;
          toast.success("OTP sent to your registered number");
          history.push("/customer-verify-otp");
        } else {
          dispatch(authFail(res));
          toast.error(res.data.details);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data.message);
        }
        dispatch(authFail(err));
      });
  };
};

export const dealerAuthSignup = (
  username,
  code,
  shopname,
  address,
  phone,
  city,
  area,
  category,
  password1,
  password2
) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${dealerRegisterURL}`, {
        username: username,
        code: code,
        shop_name: shopname,
        address: address,
        phone: phone,
        city: city,
        area: area,
        category: category,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.token;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        toast.success("Dealer registered successfully");
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status == 400) {
          toast.error(err.response.data.message);
        }
        dispatch(authFail(err));
      });
  };
};

export const dealerAuthLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${dealerLoginURL}`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        toast.success("Logged in successfully");
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data.message);
        }
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
