import React from 'react';

import { BrowserRouter as Router, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import AdminTabs from '../components/Partials/AdminTabs';

import NewOffer from '../pages/Admin/NewOffer';

const AdminRouter = () => {
  const { path } = useRouteMatch();

  return (
    <AdminTabs>
      <Switch>
        <Route exact path={`${path}/offers/new`} component={NewOffer} />
        <Redirect to="/404" />
      </Switch>
    </AdminTabs>
  )
};

export default AdminRouter;
