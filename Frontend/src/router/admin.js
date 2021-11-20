import React from 'react';

import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import AdminTabs from '../components/Partials/AdminTabs';

import Offers from '../pages/Admin/Offers';
import NewOffer from '../pages/Admin/NewOffer';

const AdminRouter = () => {
  const { path } = useRouteMatch();

  return (
    <AdminTabs>
      <Switch>
        <Route exact path={`${path}/offers`} component={Offers} />
        <Route exact path={`${path}/offers/new`} component={NewOffer} />
        <Redirect to="/404" />
      </Switch>
    </AdminTabs>
  )
};

export default AdminRouter;
