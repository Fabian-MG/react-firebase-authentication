import React from "react";
import { withAuthorization, withEmailVerification } from "../Session";
import { compose } from "recompose";
import Messages from "./Messages";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p> The Home Page is accesible by every signed in user </p>

      <Messages />
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
