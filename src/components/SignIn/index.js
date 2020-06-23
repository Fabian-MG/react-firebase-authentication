import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { HOME } from "../../constants/routes";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";

import "./Sign-in.scss";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";

const SignInPage = () => {
  return (
    <div className="sign-in-page">
      <h1>Sign In Page</h1>
      <SignInForm />
      <div className="social-login-containers">
        <SignInGoogle />
        <SignInFacebook />
      </div>
      <PasswordForgetLink />
      <SignUpLink />
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

const SignInFormBase = ({ history, firebase }) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [userCredentials, setUserCredentials] = useState(initialState);
  const [error, setError] = useState(null);
  const { email, password } = userCredentials;

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setUserCredentials(initialState);
        setError(null);
        history.push(HOME);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const isInvalid = password === "" || email === "";

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <input
        name="email"
        value={email}
        onChange={handleChange}
        type="email"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      <button
        disabled={isInvalid}
        type="submit"
        className={`submit ${isInvalid ? "disable" : ""}`}
      >
        Sign In
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInGoogleBase = ({ history, firebase }) => {
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .doSignInWithGoogle()
      .then((socialAuthUser) => {
        return firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        setError(null);
        history.push(HOME);
      })
      .catch((err) => {
        if (err.code === ERROR_CODE_ACCOUNT_EXISTS)
          err.message = ERROR_MSG_ACCOUNT_EXISTS;

        setError({err})
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="social-login-btn google" type="submit" />
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInFacebookBase = ({ history, firebase }) => {
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .doSignInWithFacebook()
      .then((socialAuthUser) => {
        return firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.displayName,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        setError(null);
        history.push(HOME);
      })
      .catch((err) => {
        if (err.code === ERROR_CODE_ACCOUNT_EXISTS)
          err.message = ERROR_MSG_ACCOUNT_EXISTS;

        setError({err})
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="social-login-btn facebook" type="submit" />
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
const SignInGoogle = compose(withRouter, withFirebase)(SignInGoogleBase);
const SignInFacebook = compose(withRouter, withFirebase)(SignInFacebookBase);

export default SignInPage;

export { SignInForm };
