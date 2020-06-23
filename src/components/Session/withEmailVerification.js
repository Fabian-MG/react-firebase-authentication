import React, { useState } from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withEmailVerification = (Component) => {
  const WithEmailVerification = ({ firebase }) => {

    const [isSent, setIsSent] = useState(false)

    const onSendEmailVerification = () => {
      firebase.doSendEmailVerification().then(() => setIsSent(true));
    };

    const needsEmailVerification = (authUser) => {
      return (
        authUser &&
        !authUser.emailVerified &&
        authUser.providerData
          .map((provider) => provider.providerId)
          .includes("password")
      );
    };

    return (
      <AuthUserContext.Consumer>
        {(authUser) =>
          needsEmailVerification(authUser) ? (
            <div>
                {isSent ? (
                  <p>
                    E-Mail confirmation sent: Check you E-Mails (Spam
                    folder included) for a confirmation E-Mail.
                    Refresh this page once you confirmed your E-Mail.
                  </p>
                ) : (
              <p>
                Verify your E-Mail: Check your E-Mails (spam folder inlcuded)
                for a confirmation E-Mail or send another confirmation E-mail
              </p> ) }
              <button type="button" onClick={onSendEmailVerification} disabled={isSent}>
                Send Confirmation E-Mail
              </button>
            </div>
          ) : (
            <Component authUser={authUser} />
          )
        }
      </AuthUserContext.Consumer>
    );
  };

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
