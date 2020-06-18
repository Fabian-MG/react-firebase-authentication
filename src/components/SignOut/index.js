import React from "react";
import { withFirebase } from "../Firebase";

import './Sign-out.scss'

const SignOutButton = ({firebase}) => (
    <button className='sign-out-btn' type="button" onClick={firebase.doSignOut}>
      Sign Out
    </button>
)

export default withFirebase(SignOutButton);
