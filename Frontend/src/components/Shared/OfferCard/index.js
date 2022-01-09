import React , { useState, useEffect } from 'react'
import { Card, CardContent, Grid, Box, Typography, Link } from '@mui/material';

import { formatNumber } from '../../../logic/helpers';
import axios from 'axios';

const OfferCard = ({ offer }) => {
  const { _id, photos, shortDescription, make, model, price, fuel, volume, power, year, kms } = offer;
  const [photoUrl, setPhotoUrl] = useState('/no-image.jpg');
  const [elevation, setElevation] = useState(1);

  useEffect(async () => {
    try {
      const validUrl = await axios.get(photos[0]);
      setPhotoUrl(validUrl.config.url);
    } catch {}
  }, []);

  return (
    <Link href={`/offer/${_id}`} sx={{ width: '100%' }}>
      <Card
        sx={{ display: 'flex' }}
        className="OfferCard"
        elevation={elevation}
        onMouseEnter={() => setElevation(5)}
        onMouseLeave={() => setElevation(1)}
      >
        <Grid container>
          <Grid item xs={12} sm={4} className='OfferCardImage'>
            <Box
              sx={{ width: '100%', height: '100%', minHeight: 180, backgroundImage: `url(${photoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              className='OfferCardImage__image'
            />
            <Box className='OfferCardImage__overlay' sx={{ backgroundColor: 'primary.dark' }}>
              <Typography className='OfferCardImage__text' variant='caption'>
                { shortDescription }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs>
            <CardContent>
              <Grid container>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h5">
                        {make.make}
                      </Typography>
                      <Typography variant="h4">
                        {model.model}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h4" fontWeight={500} sx={{mt: 2, textShadow: '3px 3px 4px darkgrey' }} color='primary.dark' >
                      {formatNumber(price)} PLN
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ mt: 2 }}>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="h6">
                      {fuel.fuel}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="h6">
                      {volume} cm³
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="h6">
                    {power} KM
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ mt: 2 }}>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="h6">
                      {year}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="h6">
                      {formatNumber(kms)} km
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>

                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
}

export default OfferCard;