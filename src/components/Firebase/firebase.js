import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebaseui";

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
    app.initializeApp(config);

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    this.auth = app.auth();
    this.db = app.database();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  // **** Auth API ****

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: "http://localhost:3000",
    });

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

            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            //step when authUser is checked
            next(authUser);
          });
      } else {
        //step when authUser is undefined
        fallback();
      }
    });
  };

  // **** Message API ****

  message = (uid) => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref("messages");
}

export default Firebase;
