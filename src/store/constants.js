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

export const productListURL = () => `${endpoint}/product-list`;
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
export const laptopCompanyListURL = `${endpoint}/laptop-company-list`;
export const createDonationURL = `${endpoint}/create-donate`;
export const fetchBlogURL = `${endpoint}/blog-list`;
export const fetchCustomerReviewURL = `${endpoint}/customer-review`;
export const createCustomerMessageURL = `${endpoint}/customer-message`;
export const fetchBlogDetailURL = (id) => `${endpoint}/blog/${id}`;
export const fetchFeaturedProductListURL = (offset, city) =>
  `${endpoint}/featured-product-list?offset=${offset}&city=${city}&limit=3`;

export const createCarProductURL = `${endpoint}/car-product-create`;
export const createBikeProductURL = `${endpoint}/bike-product-create`;
export const createMobileProductURL = `${endpoint}/mobile-product-create`;
export const createSportProductURL = `${endpoint}/sport-product-create`;
export const createElectronicProductURL = `${endpoint}/electronic-product-create`;
export const createPropertyProductURL = `${endpoint}/property-product-create`;
export const createBookProductURL = `${endpoint}/book-product-create`;
export const createFurnitureProductURL = `${endpoint}/furniture-product-create`;
