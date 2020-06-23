import React, { useState } from "react";
import { compose } from "recompose";

import { SIGN_UP, HOME } from "../../constants/routes";
import { withFirebase } from "../Firebase/context";
import { Link, withRouter } from "react-router-dom";
import * as ROLES from "../../constants/roles";

import "./Sign-Up.scss";

const SignUpPage = () => {
  return (
    <div className="sign-up-page">
      <h1>Sign Up to Start!</h1>
      <SignUpForm />
    </div>
  );
};

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
An account with an E-Mail address to
this social account already exists. Try to login from
this account instead and associate your social accounts on
your personal account page.
`;

const SignUpFormBase = ({ history, firebase }) => {
  const initialState = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    isAdmin: false,
    error: null,
  };

  const [userCredentials, setUserCredentials] = useState(initialState);
  const {
    username,
    email,
    passwordOne,
    passwordTwo,
    error,
    isAdmin,
  } = userCredentials;

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

  const handleSubmit = (e) => {
    e.preventDefault();

    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return firebase.user(authUser.user.uid).set({ username, email, roles });
      })
      .then(() => {
        return firebase.doSendEmailVerification();
      })
      .then(() => {
        setUserCredentials(initialState);
        history.push(HOME);
      })
      .catch((err) => {
        if (err.code === ERROR_CODE_ACCOUNT_EXISTS)
          err.message = ERROR_MSG_ACCOUNT_EXISTS;

        setUserCredentials({ ...userCredentials, error: err });
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const onChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setUserCredentials({ ...userCredentials, [name]: checked });
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <input
        name="username"
        value={username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <label>
        Admin:
        <input
          name="isAdmin"
          type="checkbox"
          checked={isAdmin}
          onChange={onChangeCheckbox}
        />
      </label>
      <button
        disabled={isInvalid}
        type="submit"
        className={`submit ${isInvalid ? "disable" : ""}`}
      >
        Sign Up
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpLink = () => (
  <p className="sign-up-link">
    Don´t have an account? <Link to={SIGN_UP}> Sign Up </Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
