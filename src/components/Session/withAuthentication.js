import React from "react";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: JSON.parse(localStorage.getItem("rfauthUser")),
      };
    }

    listenerT() {
      this.props.firebase.onAuthUserListener(
        (authUser) => {
          localStorage.setItem("rfauthUser", JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          this.setState({ authUser: null });
        }
      );
    }

    componentDidMount() {
      localStorage.removeItem("rfauthUser");
      this.listenerT();
    }

    componentWillUnmount() {
      this.listenerT();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};
export default withAuthentication;
