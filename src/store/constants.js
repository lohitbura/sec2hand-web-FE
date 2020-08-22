export const URL = "http://hosting123.pythonanywhere.com";

const apiURL ='/api';

export const endpoint =`${URL}${apiURL}`;

export const postListURL =  `${endpoint}/post-list`;
export const postLostURL =  `${endpoint}/post-create`;
export const userProfileURL =  `${endpoint}/userprofile`;
export const userPostsURL =  `${endpoint}/userposts`;
export const postDetailURL = (id) =>  `${endpoint}/post/${id}`;
export const postContactURL =   `${endpoint}/post-contact`;