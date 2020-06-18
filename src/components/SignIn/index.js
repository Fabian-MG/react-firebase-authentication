import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";

import { FirebaseContext } from "../Firebase/context";
import { HOME } from "../../constants/routes";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";

import "./Sign-in.scss";

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

const SignInFormBase = ({ history }) => {
  const initialState = {
    email: "",
    password: "",
  };
  const { firebase } = useContext(FirebaseContext);
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
        type="text"
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

const SignInForm = withRouter(SignInFormBase);

export default SignInPage;

export { SignInForm };
