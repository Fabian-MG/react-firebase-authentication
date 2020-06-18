import React from "react";
import { Link } from "react-router-dom";

import { LANDING, SIGN_IN, HOME, ACCOUNT } from "../../constants/routes";

import SignOutButton from "../SignOut";
import { AuthUserContext } from "../Session";

import "./Navigation.scss";

const Navigation = () => (
  <div className="Navbar">
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <ul>
    <li className="option">
      <Link to={LANDING}> Landing </Link>
    </li>
    <li className="option">
      <Link to={HOME}> Home </Link>
    </li>
    <li className="option">
      <Link to={ACCOUNT}> Account </Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li className="option">
      <Link to={LANDING}> Landing </Link>
    </li>
    <li className="option">
      <Link to={SIGN_IN}> Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
