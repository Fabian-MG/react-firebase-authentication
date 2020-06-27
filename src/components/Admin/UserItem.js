import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";

const UserItem = ({ match, firebase, state }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(state ? state : null);

  useEffect(() => {
    if (state.user) {
      return;
    }

    setLoading(true);

    firebase.user(match.params.id).on("value", (snapshot) => {
      setUser(snapshot.val());
      setLoading(false);
    });

    return () => firebase.user(match.params.id).off();
  }, [firebase]);

  const handleSendPasswordResetEmail = () => {
    firebase.doPasswordReset(user.email);
  };

  return (
    <div className="user-item-page">
      <h2>User {match.params.id} </h2>
      {loading && <div>Loading...</div>}

      {user && (
        <div>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
          <span>
            <button type="button" onClick={handleSendPasswordResetEmail}>
              Send Password Reset
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default withFirebase(UserItem);
