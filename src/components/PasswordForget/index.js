import React, { useState, useContext } from "react";

import { FirebaseContext } from "../Firebase/context";
import { Link } from "react-router-dom";
import { PASSWORD_FORGET } from "../../constants/routes";

import "./Password-forget.scss";

const PasswordForgetPage = () => {
  return (
    <div className="password-forget-page">
      <h1>
        Reset Your Password !{" "}
        <span role="img" aria-label="sad face">
          😊
        </span>
      </h1>
      <PasswordForgetForm />
    </div>
  );
};

const PasswordForgetForm = () => {
  const initialState = {
    email: "",
    error: null,
  };
  const { firebase } = useContext(FirebaseContext);
  const [credentials, setCredentials] = useState(initialState);
  const { email, error } = credentials;

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .doPasswordReset(email)
      .then(() => {
        setCredentials(initialState);
      })
      .catch((err) => {
        setCredentials(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const isInvalid = email === "";

  return (
    <form className="password-forget-form" onSubmit={handleSubmit}>
      <input
        name="email"
        value={email}
        onChange={handleChange}
        type="text"
        placeholder="Email Address"
      />
      <button
        disabled={isInvalid}
        type="submit"
        className={`submit ${isInvalid ? "disable" : ""}`}
      >
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const PasswordForgetLink = () => (
  <p className="password-forget-link">
    <Link to={PASSWORD_FORGET}>
      I forgot my password{" "}
      <span role="img" aria-label="sad face">
        😢
      </span>
    </Link>
  </p>
);

export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink };
