import React from "react";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization, AuthUserContext } from "../Session";

import "./Account.scss";
const AccountPage = () => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div className="account-page">
          <h1> {authUser.email}</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
