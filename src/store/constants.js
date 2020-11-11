// export const URL = "https://backend.sec2hand.com";
// export const URL = "https://hosting123.pythonanywhere.com";
export const URL = "http://127.0.0.1:8000";
// export const URL = " http://192.168.43.162:8000";

const apiURL = '/api';

export const endpoint = `${URL}${apiURL}`;

export const customerRegisterURL = `${endpoint}/customer-register`;
export const dealerRegisterURL = `${endpoint}/dealer-register`;
export const customerLoginURL = `${endpoint}/customer-login`;
export const dealerLoginURL = `${endpoint}/dealer-login`;


export const productListURL = (limit, offset, type, city) => `${endpoint}/product-list?limit=${limit}&offset=${offset}&category=${type}&city=${city}`;
export const productCreateURL = `${endpoint}/product-create`;

export const carCreateURL = `${endpoint}/car-create`;
export const bikeCreateURL = `${endpoint}/bike-create`;
export const mobileCreateURL = `${endpoint}/mobile-create`;
export const productDetailURL = (id) => `${endpoint}/item-detail/${id}`;

export const postsListURL = (limit, offset) => `${endpoint}/post-list?limit=${limit}&offset=${offset}`;
export const postCreateURL = `${endpoint}/post-create`;
export const postDetailURL = (id) => `${endpoint}/post-detail/${id}`;
export const postLikeURL = `${endpoint}/post-like`;
export const postCommentURl = `${endpoint}/post-comment-create`;
export const postCommentListURl = `${endpoint}/post-comment-list`;


export const dealerListURL = `${endpoint}/dealer-filter`;

export const getUserProfileURL = (username) => `${endpoint}/profile?username=${username}`;
export const getUserProfileIdURL = `${endpoint}/profile`;
export const dealerProfileEditURL = `${endpoint}/profile-edit`;
export const customerProfileEditURL = `${endpoint}/customer-profile-edit`;

export const cityListURL = `${endpoint}/city-list`;
