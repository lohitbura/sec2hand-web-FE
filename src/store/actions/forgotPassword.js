import axios from "axios";
import * as actionTypes from "./actionTypes";
import {
    changePassword,
    requestOtp, verifyOtp
} from "../constants";
import {toast} from "react-toastify";

let session_id = '';
let phone_number = '';

export const otpRequest = (number, history) => {
    return dispatch => {
        axios.post(`${requestOtp}`, {phone: number}).then(res => {
            console.log(res.data)
            if (res.data.status == true) {
                session_id = res.data.session_id;
                toast.success("OTP sent to your registered number")
                history.push("/verify-otp");
            } else {
                console.log(res.data.status)
                toast.error(res.data.detail)
            }
        })
            .catch(err => {
                console.log(err)
            })
    }
}

export const otpVerify = (otp, history) => {
    return dispatch => {
        axios.post(`${verifyOtp}`, {otp, session_id}).then(res => {
            console.log(res.data)
            if (res.data.status == true) {
                session_id = res.data.session_id;
                toast.success("OTP verified successful.")
                history.push("/change-password");
            } else {
                console.log(res.data.status)
                toast.error(res.data.detail)
            }
        })
            .catch(err => {
                console.log(err)
            })
    }
}


export const resetPassword = (password1, password2, history) => {
    return dispatch => {
        axios.post(`${changePassword}`, {
            session_id,
            "password": password1,
            "confirm_password": password2
        }).then(res => {
            console.log(res.data)
            if (res.data.status == true) {
                toast.success("Password changed successful.")
                history.push("/dealer-login");
            } else {
                toast.error("Password has been changed")
            }
        })
            .catch(err => {
                console.log(err)
            })
    }
}