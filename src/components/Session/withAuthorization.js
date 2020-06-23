import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase/context";
import { compose } from "recompose";
import AuthUserContext from "./context";
import { SIGN_IN } from "../../constants/routes";

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
  
    listenerT() {
      this.props.firebase.onAuthUserListener(
        (authUser) => {
          if (!condition(authUser)) {
            this.props.history.push(SIGN_IN);
          }
        },
        () => this.props.history.push(SIGN_IN)
      );
    }

    componentDidMount() {
      this.listenerT();
    }

    componentWillUnmount() {
      this.listenerT();
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
