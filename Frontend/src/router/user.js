import React from 'react';

import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import Login from '../pages/User/Login';
import Register from '../pages/User/Register';
import User from '../pages/User';

const UserRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/login`} component={Login} />
      <Route exact path={`${path}/register`} component={Register} />
      <Route exact path={`${path}/:userId`} component={User} />
      <Redirect to="/404" />
    </Switch>
  )
};

export default UserRouter;
