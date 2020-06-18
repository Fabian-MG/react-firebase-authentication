import React, { useState } from "react";
import { withFirebase } from "../Firebase";

import "./Password-change.scss";

const PasswordChangeForm = ({ firebase }) => {
  const initialState = {
    passwordOne: "",
    passwordTwo: "",
    error: null,
  };
  const [credentials, setCredentials] = useState(initialState);
  const { passwordOne, passwordTwo, error } = credentials;

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setCredentials(initialState);
      })
      .catch((err) => {
        setCredentials({ ...credentials, error: err });
      });
  };

  const hanldeChange = (e) => {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

  return (
    <form className="password-change-form" onSubmit={handleSubmit}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={hanldeChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={hanldeChange}
        type="password"
        placeholder="Confirm New Password"
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

export default withFirebase(PasswordChangeForm);
