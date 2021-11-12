import React , { useState, useEffect } from 'react'
import { Card, CardContent, Grid, Box, Typography, Link } from '@mui/material';

import { formatNumber } from '../../../logic/helpers';
import axios from 'axios';

const OfferCard = ({ offer }) => {
  const { _id, photos, shortDescription, make, model, price, fuel, volume, power, year, kms } = offer;
  const [photoUrl, setPhotoUrl] = useState('/no-image.jpg');

  useEffect(async () => {
    try {
      const validUrl = await axios.get(photos[0]);
      setPhotoUrl(validUrl.config.url);
    } catch {}
  }, []);

  return (
    <Link href={`/offer/${_id}`} sx={{ width: '100%' }}>
      <Card sx={{ display: 'flex' }}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{ width: '100%', height: '100%', minHeight: 180, backgroundImage: `url(${photoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
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
                    <Typography variant="h4" fontWeight={500} sx={{mt: 2 }}>
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

  // return (
  //   <Link to={`/offer/${_id}`} className="OfferCard-Link">
  //     <div className="OfferCard">
  //       <div className="image">
  //         <img src={photos[0]} alt="main" className="image__pic" />
  //         <div className="image__overlay">
  //           <div className="image__text">
  //             {shortDescription}
  //           </div>
  //         </div>
  //       </div>
  //       <div className="details">
  //         <div className="details__header">
  //           <p className="details__make">{make.make}</p>
  //           <p className="details__model">{model.model}</p>
  //           <p className="details__price">{formatNumber(price)}<span className="details__price--pln"> PLN</span></p>
  //         </div>
  //         <div className="details__engine">
  //           <p>{fuel.fuel}</p>
  //           <p>{volume} cm³</p>
  //           <p>{power} KM</p>
  //         </div>
  //         <div className="details__bottom">
  //         <p>{year}</p>
  //           <p>{formatNumber(kms)} km</p>
  //         </div>
  //       </div>
  //     </div>
  //   </Link>
  // );
}

export default OfferCard;