import React from 'react';

import { Provider } from 'react-redux';
import store from './store';

import Router from './router';

import { ThemeProvider } from '@mui/material/styles';
import theme from './stylesheets/theme';
import './stylesheets/App.scss';

import AppBar from './components/Partials/AppBar';
import Footer from './components/Partials/Footer';
import { Box } from '@mui/material';

const App = () => { 
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: 'secondary.light' }} className="App">
          <AppBar />
          <Router />
          <Footer />
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
