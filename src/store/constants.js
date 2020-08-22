// export const URL = "http://hosting123.pythonanywhere.com";
export const URL = "http://127.0.0.1:8000";

const apiURL ='/api';

export const endpoint =`${URL}${apiURL}`;

export const customerRegisterURL =  `${endpoint}/customer-register`;
export const dealerRegisterURL =  `${endpoint}/dealer-register`;
export const customerLoginURL =  `${endpoint}/customer-login`;
export const dealerLoginURL =  `${endpoint}/dealer-login`;


export const productListURL =  `${endpoint}/product-list`;
export const productCreateURL =  `${endpoint}/product-create`;

export const postsListURL =  `${endpoint}/post-list`;
export const postCreateURL =  `${endpoint}/post-create`;

export const dealerListURL =  `${endpoint}/dealer-filter`;

export const getUserProfileURL =  `${endpoint}/profile`;
export const dealerProfileEditURL =  `${endpoint}/profile-edit`;
