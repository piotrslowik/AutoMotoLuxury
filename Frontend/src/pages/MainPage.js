import React from 'react';

import Body from '../components/Partials/Body';
import Filters from '../components/Partials/Filters';

import { Grid } from '@mui/material';

const MainPage = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={4}>
        <Filters />
      </Grid>
      <Grid item xs={12} lg={8}>
        <Body />
      </Grid>
    </Grid>
  );
}

export default MainPage;
