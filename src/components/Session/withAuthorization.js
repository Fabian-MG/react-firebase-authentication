import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase/context";
import { compose } from "recompose";
import AuthUserContext from "./context";
import { SIGN_IN } from "../../constants/routes";

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {

    listener() {
      this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if(authUser) {
            this.props.firebase
              .user(authUser.uid)
              .once('value')
              .then(snapshot => {
                const dbUser = snapshot.val()

                if(!dbUser.roles) {
                  dbUser.roles = {}
                }

                authUser = {
                  uid: authUser.uid,
                  email: authUser.email,
                  ...dbUser
                }

                if(!condition(authUser)) {
                  this.props.history.push(SIGN_IN)
                }
              })
          } else {
            this.props.history.push(SIGN_IN)
          }
        }
      )
    }

    componentDidMount() {
      this.listener()  
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return compose(withRouter, withFirebase)(WithAuthorization);
};
export default withAuthorization;
//60
