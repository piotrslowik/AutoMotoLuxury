import React from 'react';

import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import AdminTabs from '../components/Partials/AdminTabs';

import Offers from '../pages/Admin/Offers';
import NewOffer from '../pages/Admin/NewOffer';
import Fuels from '../pages/Admin/Fuels';
import Makes from '../pages/Admin/Makes';
import Models from '../pages/Admin/Models';
import Origins from '../pages/Admin/Origins';

const AdminRouter = () => {
  const { path } = useRouteMatch();

  return (
    <AdminTabs>
      <Switch>
        <Route exact path={`${path}/offers`} component={Offers} />
        <Route exact path={`${path}/offers/new`} component={NewOffer} />
        <Route exact path={`${path}/fuels`} component={Fuels} />
        <Route exact path={`${path}/makes`} component={Makes} />
        <Route exact path={`${path}/models`} component={Models} />
        <Route exact path={`${path}/origins`} component={Origins} />
        <Redirect to="/404" />
      </Switch>
    </AdminTabs>
  )
};

export default AdminRouter;
