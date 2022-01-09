import React from 'react';
import { useSelector } from 'react-redux';

import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import Login from '../pages/User/Login';
import Register from '../pages/User/Register';
import User from '../pages/User';
import Favorites from '../pages/User/Favorites';

const UserRouter = () => {
  const { path } = useRouteMatch();
  const { loggedIn } = useSelector(state => state.user);

  return (
    <Switch>
      {loggedIn ? <Route exact path={`${path}/favorites`} component={Favorites} /> : null }
      {loggedIn ? <Route exact path={`${path}/:userId/profile`} component={User} /> : null }
      {!loggedIn ? <Route exact path={`${path}/login`} component={Login} /> : null }
      {!loggedIn ? <Route exact path={`${path}/register`} component={Register} /> : null }
      <Redirect to="/404" />
    </Switch>
  )
};

export default UserRouter;
