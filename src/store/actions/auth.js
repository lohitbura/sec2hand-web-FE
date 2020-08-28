import axios from "axios";
import * as actionTypes from "./actionTypes";
import {customerRegisterURL, customerLoginURL, dealerRegisterURL, dealerLoginURL} from "../constants";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post(`${customerLoginURL}`, {
                username: username,
                password: password
            })
            .then(res => {
                const token = res.data.token;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};


export const authSignup = (username, password1, password2, phone, city) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post(`${customerRegisterURL}`, {
                username: username,
                password1: password1,
                password2: password2,
                phone: phone,
                city: city
            })
            .then(res => {
                const token = res.data.token;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};

export const dealerAuthSignup = (username, code, shopname, address, phone, city, area, category, password1, password2) => {
    return dispatch => {
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
            .then(res => {
                const token = res.data.token;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};

export const dealerAuthLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post(`${dealerLoginURL}`, {
                username: username,
                password: password
            })
            .then(res => {
                const token = res.data.token;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};


export const authCheckState = () => {
    return dispatch => {
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
