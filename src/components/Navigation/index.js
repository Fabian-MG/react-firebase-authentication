import React from "react";
import { Link } from "react-router-dom";

import { LANDING, SIGN_IN, HOME, ACCOUNT, ADMIN } from "../../constants/routes";

import "./Navigation.scss";

const Navigation = () => {
  return (
    <div className="Navbar">
      <ul>
        <li className="option">
          <Link to={SIGN_IN}> Sign In</Link>
        </li>
        <li className="option">
          <Link to={LANDING}> Landing </Link>
        </li>
        <li className="option">
          <Link to={HOME}> Home </Link>
        </li>
        <li className="option">
          <Link to={ACCOUNT}> Account </Link>
        </li>
        <li className="option">
          <Link to={ADMIN}> Adminstration </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
