import React, { createContext } from "react";

export const FirebaseContext = createContext(null);

export const withFirebase = (WrappedComponent) => ({ ...otherProps }) => (
  <FirebaseContext.Consumer >
    {(firebase) => <WrappedComponent {...otherProps} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
