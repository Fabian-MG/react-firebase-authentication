import React, { createContext } from "react";
import Firebase from "./firebase";

export const FirebaseContext = createContext();

const FirebaseContextProvider = (props) => {
  return (
    <FirebaseContext.Provider value={{ firebase: new Firebase() }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContextProvider;
