import React from 'react';

import { Provider } from 'react-redux';
import store from './store';

import Router from './router';

import { ThemeProvider } from '@mui/material/styles';
import theme from './stylesheets/theme';
import './stylesheets/App.scss';

import AppBar from './components/Partials/AppBar';
import { Box, Container } from '@mui/material';

const App = () => { 
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: 'secondary.light', pb: 2, }} className="App">
          <AppBar />
          <Container maxWidth="xl">
            <Router />
          </Container>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
