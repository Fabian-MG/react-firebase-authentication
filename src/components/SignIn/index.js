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
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
};

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

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
