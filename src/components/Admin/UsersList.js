import React, { useState, useEffect } from "react";

import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import { ADMIN } from "../../constants/routes";

const UserList = ({ firebase }) => {
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
    <div className="user-list">
      <h2>Users</h2>
      {loading && <div>Loading ... </div>}
      <ul>
        {users.map((user) => (
          <li className="user" key={user.uid}>
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
            <span>
              <Link
                to={{
                  pathname: `${ADMIN}/${user.uid}`,
                  state: { user },
                }}
              >
                Details
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withFirebase(UserList);
