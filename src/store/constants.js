// export const URL = "https://backend.sec2hand.com";
// export const URL = "https://harsh9671.pythonanywhere.com";
// export const URL= "https://priyanshu11.pythonanywhere.com";
export const URL = "http://localhost:8000";

const apiURL = "/api";

export const endpoint = `${URL}${apiURL}`;

export const customerRegisterURL = `${endpoint}/customer-register`;
export const customerVerifyOtpURL = `${endpoint}/customer-verify-otp`;

export const dealerRegisterURL = `${endpoint}/dealer-register`;
export const customerLoginURL = `${endpoint}/customer-login`;
export const dealerLoginURL = `${endpoint}/dealer-login`;

// export const productListURLS = (limit, offset, type,brands,,models, city) => `${endpoints}/product-list?limit=${limit}&offset=${offset}&category=${type}&brand=${brands}&model=${models}&city=${city}`;

// export const productListURL = (
//   limit,
//   offset,
//   type,
//   brands,
//   models,
//   p_fuel,
//   owner_state,
//   city,
//   km_begin,
//   km_end,
//   price_begin,
//   price_end,
//   year_begin,
//   year_end
// ) =>
//   `${endpoint}/product-list?limit=${limit}&offset=${offset}&category=${type}&brand=${brands}&model=${models}&fuel_type=${p_fuel}&ownership_state=${owner_state}&city=${city}&km_begin=${km_begin}&km_end=${km_end}&price_begin=${price_begin}&price_end=${price_end}&year_begin=${year_begin}&year_end=${year_end}`;
// export const productListURL = (limit, offset, type, brands ,models, fuel, owner_state, city, km_begin, km_end, price_begin, price_end, year_begin, year_end ) => `${endpoint}/product-list?limit=${limit}&offset=${offset}&category=${type}&brand=${brands}&model=${models}&fuel_type=${fuel}&ownership_state=${owner_state}&city=${city}&km_begin=${km_begin}&km_end=${km_end}&price_begin=${price_begin}&price_end=${price_end}&year_begin=${year_begin}&year_end=${year_end}`;
export const productListURL = (limit, offset, type) =>
  `${endpoint}/product-list?limit=${limit}&offset=${offset}&category=${type}`;
export const productCreateURL = `${endpoint}/product-create`;

export const carCreateURL = `${endpoint}/car-create`;
export const bikeCreateURL = `${endpoint}/bike-create`;
export const mobileCreateURL = `${endpoint}/mobile-create`;
export const productDetailURL = (id) => `${endpoint}/item-detail/${id}`;

export const postsListURL = (limit, offset) =>
  `${endpoint}/post-list?limit=${limit}&offset=${offset}`;
export const postCreateURL = `${endpoint}/post-create`;
export const postDetailURL = (id) => `${endpoint}/post-detail/${id}`;
export const postLikeURL = `${endpoint}/post-like`;
export const postCommentURl = `${endpoint}/post-comment-create`;
export const postCommentListURl = `${endpoint}/post-comment-list`;

export const dealerListURL = `${endpoint}/dealer-filter`;

export const getUserProfileURL = (username) =>
  `${endpoint}/profile?username=${username}`;
export const getUserProfileIdURL = `${endpoint}/profile`;
export const dealerProfileEditURL = `${endpoint}/profile-edit`;
export const customerProfileEditURL = `${endpoint}/customer-profile-edit`;

export const requestOtp = `${endpoint}/send-otp`;
export const verifyOtp = `${endpoint}/verify-otp`;
export const changePassword = `${endpoint}/change-password`;

export const cityListURL = `${endpoint}/city-list`;
export const brandListURL = `${endpoint}/brand-list`;
export const fetchFeaturedProductListURL = (offset) =>
  `${endpoint}/featured-product-list?offset=${offset}`;
