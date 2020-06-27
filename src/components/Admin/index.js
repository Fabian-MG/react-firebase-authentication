import React from "react";
import { compose } from "recompose";
import { Switch, Route } from "react-router-dom";

//COMPONENTS
import UserItem from "./UserItem";
import UsersList from "./UsersList";
import * as ROLES from "../../constants/roles";
import { ADMIN_DETAILS, ADMIN } from "../../constants/routes";

//HOC
import { withEmailVerification } from "../Session";
import withAuthorization from "../Session/withAuthorization";

//STYLES
import "./Admin.scss";

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>Administration Page</h1>
      <p>The Admin Page is accessible by every signed in admin user</p>
      <Switch>
        <Route exact path={ADMIN_DETAILS} component={UserItem} />
        <Route exact path={ADMIN} component={UsersList} />
      </Switch>
    </div>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminPage);
