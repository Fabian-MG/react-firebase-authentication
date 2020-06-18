import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../Firebase/context";
import AuthUserContext from "./context";

const withAuthentication = (WrappedComponent) => ({ ...otherProps }) => {
  const { firebase } = useContext(FirebaseContext);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      user ? setAuthUser(user) : setAuthUser(null);
    });

    return () => {
      firebase.auth.onAuthStateChanged((user) => {
        user ? setAuthUser(user) : setAuthUser(null);
      });
    };
  }, [firebase.auth]);

  
  return (
    <AuthUserContext.Provider value={{ authUser }}>
      <WrappedComponent {...otherProps} />
    </AuthUserContext.Provider>
  );
};
export default withAuthentication;
