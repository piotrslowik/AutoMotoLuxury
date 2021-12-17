import React from 'react';

import { useSelector } from 'react-redux';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import AdminRoutes from './admin';
import UserRoutes from './user';

import MainPage from '../pages/MainPage';
import Offer from '../pages/Offer';
import Contact from '../pages/Contact';
import Error404 from '../pages/Error404';

const AppRouter = () => {
  const { isAdmin } = useSelector(state => state.user);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/offer/:offerId" component={Offer} />
        { isAdmin ?
          <Route path="/admin">
            <AdminRoutes />
          </Route> : null }
        <Route path="/user">
          <UserRoutes />
        </Route>
        <Route exact path="/404" component={Error404} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  )
}

export default AppRouter;
