import React, { useState } from "react";
import { compose } from "recompose";

import { SIGN_UP, HOME } from "../../constants/routes";
import { withFirebase } from "../Firebase/context";
import { Link, withRouter } from "react-router-dom";

import "./Sign-Up.scss";

const SignUpPage = () => {
  return (
    <div className="sign-up-page">
      <h1>Sign Up to Start!</h1>
      <SignUpForm />
    </div>
  );
};

const SignUpFormBase = ({ history, firebase }) => {
  const initialState = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null,
  };
  const [userCredentials, setUserCredentials] = useState(initialState);
  const { username, email, passwordOne, passwordTwo, error } = userCredentials;

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        setUserCredentials(initialState);
        history.push(HOME);
      })
      .catch((error) => {
        setUserCredentials({ ...userCredentials, error });
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
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
