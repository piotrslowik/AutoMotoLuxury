import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import MainPage from './pages/MainPage';
import NewOffer from './pages/NewOffer';
import Offer from './pages/Offer';
import Error404 from './pages/Error404';

import { Provider } from 'react-redux';
import store from './store';

import { ThemeProvider } from '@emotion/react'
import theme from '@rebass/preset'

import './stylesheets/App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/offer" component={NewOffer} />
            <Route exact path="/offer/:offerId" component={Offer} />
            <Route exact path="/404" component={Error404} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
