import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import DealerLogin from "./containers/DealerLogin";
import DealerSignup from "./containers/DealerSignup";
import Review from "./containers/review";
import Dealer from "./containers/dealer";
import Profile from "./containers/profile";
import CreateProduct from "./containers/createProduct";
import CreatePost from "./containers/createPost";
import EditProfile from "./containers/editProfile";
import ProductDetail from "./containers/productDetail";
import PostDetail from "./containers/postDetail";
import ProductEdit from "./containers/productEdit";
import PostEdit from "./containers/postEdit";
import AboutUs from "./containers/aboutUs";
import ContactUs from "./containers/contactUs";
import Privacy from "./containers/privacy";
import ReactToast from "./containers/toast";
import CustomerVerifyOtp from "./containers/customerVerifyOtp";
import SendOtp from "./containers/Forgot password/sendOtp";
import VerifyOtp from "./containers/Forgot password/verifyOtp";
import ChangePassword from "./containers/Forgot password/changePassword";

const BaseRouter = () => (
  <Hoc>
      <ReactToast/>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/dealer-login" component={DealerLogin} />
    <Route path="/dealer-signup" component={DealerSignup} />
    <Route path="/review" component={Review} />
    <Route path="/dealer" component={Dealer} />
    <Route path="/profile/:username" component={Profile} />
    <Route path="/product-create" component={CreateProduct} />
    <Route path="/post-create" component={CreatePost} />
    <Route path="/profile-edit" component={EditProfile} />
    <Route path="/product/:id" component={ProductDetail} />
    <Route path="/productEdit/:id" component={ProductEdit} />
    <Route path="/postEdit/:id" component={PostEdit} />
    <Route path="/post/:id" component={PostDetail} />
    <Route path="/about" component={AboutUs} />
    <Route path="/contact" component={ContactUs} />
    <Route path="/privacy" component={Privacy} />
    <Route exact path="/" component={HomepageLayout} />
    <Route exact path="/customer-verify-otp" component={CustomerVerifyOtp} />
    <Route exact path="/send-otp" component={SendOtp} />
    <Route exact path="/verify-otp" component={VerifyOtp} />
    <Route exact path="/change-password" component={ChangePassword} />
  </Hoc>
);

export default BaseRouter;
