import React, { useEffect, useState } from 'react'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import MainPage from './pages/MainPage';
import NewOffer from './pages/NewOffer';
import Offer from './pages/Offer';
import Error404 from './pages/Error404';

import DataContext from './context/data-context';

import { getFuels } from './logic/graphql/fuel';
import { getOrigins } from './logic/graphql/origin';
import { getMakes } from './logic/graphql/make';

import './stylesheets/App.scss';
import { LocalStorageGet, LocalStorageSave } from './logic/helpers';

const App = () => {
  const [fuels, setFuels] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [makes, setMakes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        handleDataInit('fuels', getFuels, setFuels);
        handleDataInit('origins', getOrigins, setOrigins);
        handleDataInit('makes', getMakes, setMakes);
      }
      catch (error) {
        throw error;
      }
    })();
  }, []);

  const handleDataInit = async (array, getter, setter) => {
    const storage = LocalStorageGet(array);
    if (storage) {
      const result = JSON.parse(storage);
      setter(result);
    }
    else {
      const result = await getter();
      LocalStorageSave(array, JSON.stringify(result));
      setter(result);
    }
  }

  return (
    <Router>
      <DataContext.Provider value={{fuels, origins, makes}}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/offer" component={NewOffer} />
          <Route exact path="/offer/:offerId" component={Offer} />
          <Route exact path="/404" component={Error404} />
          <Redirect to="/404" />
        </Switch>
      </DataContext.Provider>
    </Router>
  );
}

export default App;
