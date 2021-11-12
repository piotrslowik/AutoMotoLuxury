import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../../Shared/OfferCard';
import Loader from '../../Shared/Loader';
import Grid from '@mui/material/Grid';

import { getOffers } from '../../../logic/graphql/offer';

const Body = ({
  filterSetup,
}) => {

  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchOffers();
  }, []);
  
  const fetchOffers = async () => {
    const result = await getOffers(filterSetup);
    setOffers(result);
    setIsLoading(false);
  }

  return (
    <div className="Body">
      {isLoading
      ? <Loader text="Pobieram oferty" />
      : <Grid container gap={3}>
        {
          offers.map( offer => {
            return <Grid item xs={12} key={offer._id}> <OfferCard offer={offer} key={offer._id} /> </Grid>
          })
        }
        </Grid>
      }
    </div>
  );
}

Body.defaultProps = {
  filterSetup: {
    originId: 0,
    makeId: 0,
    modelId: 0,
    fuelId: 0,
    kmsMin: 0,
    kmsMax: 999999999,
    PriceMin: 0,
    PriceMax: 999999999,
    yearMin: 0,
    yearMax: 9999,
  },
}

Body.propTypes = {
  filterSetup: PropTypes.shape({
    originId: PropTypes.string,
    makeId: PropTypes.string,
    modelId: PropTypes.string,
    fuelId: PropTypes.string,
    kmsMin: PropTypes.number,
    kmsMax: PropTypes.number,
    PriceMin: PropTypes.number,
    PriceMax: PropTypes.number,
    yearMin: PropTypes.number,
    yearMax: PropTypes.number,
  })
}

export default Body;
