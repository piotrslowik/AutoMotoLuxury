import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import helpersActions from "../../../store/actions/helpers";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import OfferCard from '../../../components/Shared/OfferCard';

import { getOffersByIdList } from "../../../logic/graphql/offer";

const Favorites = () => {
  const dispatch = useDispatch();

  const { favorites } = useSelector(state => state.user);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchOffers();
  }, []);

  const hasFavs = () => {
    return favorites.length > 0;
  }
  
  const fetchOffers = async () => {
    if (hasFavs()) {
      try {
        const result = await getOffersByIdList(favorites.map(offer => offer._id));
        setOffers(result);
      }
      catch (error) {
        dispatch(helpersActions.setSnackbar({ message: error.message, type: 'error' }));
        setOffers([]);
      }
    }
    setIsLoading(false);
  }

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Paper sx={{ py: 3, mb: 4 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '3rem' } }}>
          Ulubione oferty
        </Typography>
      </Paper>
      {hasFavs()
      ?
        isLoading
        ? <CircularProgress size={120} sx={{ mt: 5 }} />
        : <Grid container gap={3}>
          {
            offers.map( offer => {
              return <Grid item xs={12} key={offer._id}> <OfferCard offer={offer} key={offer._id} /> </Grid>
            })
          }
          </Grid>
      : <Typography variant="h4" sx={{ fontSize: { xs: '1.2rem', md: '2rem' } }}>
          Nie masz jeszcze ulubionych ofert
        </Typography>
      }
    </Container>
  );
}

export default Favorites;
