import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyCpFMXbm1n_BNdMy3WynNRDfXqKL6M-5uE",
  authDomain: "react-firebase-authentic-c75bb.firebaseapp.com",
  databaseURL: "https://react-firebase-authentic-c75bb.firebaseio.com",
  projectId: "react-firebase-authentic-c75bb",
  storageBucket: "react-firebase-authentic-c75bb.appspot.com",
  messagingSenderId: "155913372311",
  appId: "1:155913372311:web:bc065b1a933442d6b1dfd2",
};

class Firebase {
  constructor() {
    try {
      app.initializeApp(config);
    } catch (err) {
      // we skip the “already exists” message which is
      // not an actual error when we’re hot-reloading
      if (!/already exists/.test(err.message)) {
        console.error("Firebase initialization error raised", err.stack);
      }
    }

    this.auth = app.auth();
    this.db = app.database();
  }

  // **** Auth API ****

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doSignOut = () => this.auth.signOut();

  // **** User API ****

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // **** Merge Auth and DB User API ****

  onAuthUserListener = (next, fallback) => {
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
            const dbUser = snapshot.val();
            // default empty roles

            if (dbUser.roles === null) {
              console.log("no hay");
              dbUser.roles = {};
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
  };
}

export default Firebase;
