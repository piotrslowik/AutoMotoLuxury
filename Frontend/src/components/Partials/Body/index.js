import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import offersActions from '../../../store/actions/offers';

import OfferCard from '../../Shared/OfferCard';
import Loader from '../../Shared/Loader';
import Grid from '@mui/material/Grid';

import { getOffers } from '../../../logic/graphql/offer';
import { Typography } from '@mui/material';

const Body = () => {
  const dispatch = useDispatch();

  const offers = useSelector(state => state.offers);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchOffers();
  }, []);
  
  const fetchOffers = async () => {
    const result = await getOffers();
    dispatch(offersActions.setOffers(result));
    setIsLoading(false);
  }

  return (
    <div className="Body">
      {isLoading
      ? <Loader text="Pobieram oferty" />
      : <Grid container gap={3}>
        {offers.length > 0
        ? offers.map( offer => {
            return <Grid item xs={12} key={offer._id}> <OfferCard offer={offer} key={offer._id} /> </Grid>
          })
        : <Typography
            variant="h5"
            mt={1}
            sx={{ textAlign: 'center', width: '100%' }}
          >
            Nie znaleziono ofert
          </Typography>
        }
        </Grid>
      }
    </div>
  );
}

export default Body;
