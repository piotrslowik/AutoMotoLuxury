import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import AdminRoutes from './admin';

import MainPage from '../pages/MainPage';
import Offer from '../pages/Offer';
import Error404 from '../pages/Error404';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/offer/:offerId" component={Offer} />
        <Route path="/admin">
          <AdminRoutes />
        </Route>
        <Route exact path="/404" component={Error404} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  )
}

export default AppRouter;
