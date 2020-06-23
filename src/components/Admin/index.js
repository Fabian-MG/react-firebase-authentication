import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase/context";

import "./Admin.scss";
import * as ROLES from "../../constants/roles";
import { compose } from "recompose";
import withAuthorization from "../Session/withAuthorization";
import { withEmailVerification } from "../Session";

const AdminPage = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      setUsers(usersList);
      setLoading(false);
    });

    return () => firebase.users().off();
  }, [firebase]);

  return (
    <div className="admin-page">
      <h1>Administration Page</h1>
      <p>The Admin Page is accessible by every signed in admin user</p>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
};

const UserList = ({ users }) => (
  <ul className="user-list">
    {users.map((user) => (
      <li classname="user" key={user.uid}>
        <span>
          <strong className="prop">ID: </strong> {user.uid}
        </span>
        <hr />
        <span>
          <strong className="prop">E-Mail:</strong> {user.email}
        </span>
        <hr />
        <span>
          <strong className="prop">Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AdminPage);
