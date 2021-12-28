import React, { useState, useEffect } from 'react';

import OfferCard from '../../Shared/OfferCard';
import Loader from '../../Shared/Loader';
import Grid from '@mui/material/Grid';

import { getOffers } from '../../../logic/graphql/offer';
import { Typography } from '@mui/material';

const Body = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchOffers();
  }, []);
  
  const fetchOffers = async () => {
    const result = await getOffers();
    setOffers(result);
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
