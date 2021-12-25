import React, { useState, useEffect } from 'react';

import ImageGallery from 'react-image-gallery';

import Loader from '../../components/Shared/Loader';
import IconAndText from '../../components/Shared/IconAndText';

import { faCalendarAlt, faForward, faCube, faRoad, faMoneyBillWave, faGasPump } from '@fortawesome/free-solid-svg-icons'

import { getOfferDetails } from '../../logic/graphql/offer';
import { toggleFavoriteOffer } from '../../logic/graphql/user';
import { formatNumber } from '../../logic/helpers';

import { useSelector, useDispatch } from 'react-redux';
import offerActions  from '../../store/actions/offer';
import userActions  from '../../store/actions/user';
import helpersActions  from '../../store/actions/helpers';

import { Button, Card, CardContent, Grid, Typography, Icon, Tooltip } from '@mui/material';

const Offer = (props) => {
  const dispatch = useDispatch();

  const offer = useSelector(state => state.offer);
  const { favorites, id } = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const { _id, photos, make, model, generation, price, fuel, volume, power, year, kms, longDescription } = offer;

  useEffect(() => {
    const { offerId } = props.match.params
    fetchOffer(offerId);
  }, [dispatch]);
  useEffect(() =>{
    parseImages();
  }, [offer]);
  useEffect( () => () => clearOffer(), [] );
  
  const fetchOffer = async offerId => {
    const result = await getOfferDetails(offerId);
    setOffer(result);
    setIsLoading(false);
  }

  const setOffer = offer => {
    dispatch(offerActions.setOffer(offer));
  }

  const clearOffer = () => {
    dispatch(offerActions.clear());
  }

  const parseImages = async () => {
    if (photos) {
      const images = offer.photos.map(img => {
        return {
          original: img,
          thumbnail: img,
        }
      })
      setImages(images);
    }
  }

  const isFavorite = () => {
    return favorites.some(offer => offer._id === _id);
  }

  const toggleFavorite = async () => {
    try {
      await toggleFavoriteOffer(id, _id);
      dispatch(userActions.setFavorites());
    }
    catch (error) {
      dispatch(helpersActions.setSnackbar({ message: error.message, type: 'error' }));
    }
  }

  const favButton = () => {
    return (
      <Tooltip title={ isFavorite() ? 'Usuń z ulubionych' : 'Dodaj do ulubionych' }>
        <Button
          startIcon={<Icon>favorite</Icon>}
          variant={isFavorite() ? 'outlined' : 'contained'}
          size="large"
          color="secondary"
          sx={ isFavorite() ? { color: 'secondary.dark' } : {}}
          onClick={toggleFavorite}
        >
          { isFavorite() ? 'Ulubione' : 'Dodaj do ulubionych' }
        </Button>
      </Tooltip>
    )
  }
  
  return (
    <Grid container spacing={4}>
    {isLoading
    ? <Loader text="Pobieranie danych" />
    : <React.Fragment>
        <Grid item xs={12} md={7}>
          <ImageGallery items={images} showPlayButton={false} thumbnailPosition="left" />
        </Grid>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h4">
                {make.make}
              </Typography>
              <Typography variant="h5">
                {model.model} {generation}
              </Typography>
              <Typography variant="h6">
                <IconAndText icon={faGasPump} text={fuel.fuel} />
                <IconAndText icon={faMoneyBillWave} text={`${formatNumber(price)} PLN`} />
                <IconAndText icon={faCalendarAlt} text={year.toString()} />
                <IconAndText icon={faForward} text={`${power} KM`} />
                <IconAndText icon={faCube} text={`${volume} cm3`} />
                <IconAndText icon={faRoad} text={`${formatNumber(kms)} km`} />
              </Typography>
              { favButton() }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card>
            <CardContent>
              <Typography variant="body1">
                { longDescription }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </React.Fragment> }
    </Grid>
  )
}

export default Offer;
