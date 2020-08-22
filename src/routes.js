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

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/dealer-login" component={DealerLogin} />
    <Route path="/dealer-signup" component={DealerSignup} />
    <Route path="/review" component={Review} />
    <Route path="/dealer" component={Dealer} />
    <Route exact path="/" component={HomepageLayout} />
  </Hoc>
);

export default BaseRouter;
