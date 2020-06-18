import React, { useContext } from "react";
import { FirebaseContext } from "../Firebase/context";

import './Sign-out.scss'

const SignOutButton = () => {
  const { firebase } = useContext(FirebaseContext);

  return (
    <button className='sign-out-btn' type="button" onClick={firebase.doSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
