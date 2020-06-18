import React from "react";
import { Route, Switch } from "react-router-dom";

// My components and routes
import {
  LANDING,
  SIGN_IN,
  HOME,
  ACCOUNT,
  ADMIN,
  SIGN_UP,
  PASSWORD_FORGET,
} from "../../constants/routes";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import { withAuthentication } from "../Session";

//stylesheet
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path={LANDING} component={LandingPage} />
        <Route exact path={SIGN_UP} component={SignUpPage} />
        <Route exact path={SIGN_IN} component={SignInPage} />
        <Route exact path={PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route exact path={HOME} component={HomePage} />
        <Route exact path={ACCOUNT} component={AccountPage} />
        <Route exact path={ADMIN} component={AdminPage} />
      </Switch>
    </div>
  );
};

export default withAuthentication(App);
