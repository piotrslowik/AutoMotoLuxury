import React, { useState, useEffect } from 'react';

import ImageGallery from 'react-image-gallery';

import Loader from '../../components/Shared/Loader';
import IconAndText from '../../components/Shared/IconAndText';

import { faCalendarAlt, faForward, faCube, faRoad, faMoneyBillWave, faGasPump } from '@fortawesome/free-solid-svg-icons'

import { getOfferDetails } from '../../logic/graphql/offer';
import { formatNumber } from '../../logic/helpers';

import { useSelector, useDispatch } from 'react-redux';
import offerActions  from '../../store/actions/offer';
import { Button, Card, CardContent, Grid, Typography, Icon } from '@mui/material';

const Offer = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const offer = useSelector(state => state.offer);
    const dispatch = useDispatch();
    const [images, setImages] = useState([]);
    const { photos, make, model, generation, price, fuel, volume, power, year, kms, longDescription } = offer;

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
        if(offer.photos) {
            const images = offer.photos.map(img => {
                return {
                    original: img,
                    thumbnail: img,
                }
            })
            setImages(images);
        }
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
                <Button startIcon={<Icon>favorite</Icon>} variant="contained" size="large" color="secondary">
                  Ulubione
                </Button>
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
    //     <div className="Offer flex-column-center">
    //         {isLoading
    //         ?   <Loader text="Pobieranie danych" />
    //         :   <><div className="Offer-main">
    //                 <ImageGallery items={images} />
    //                 <div className="Offer-data">
    //                     <p className="Offer-data__name">
    //                         {`${offer.make.make} ${offer.model.model} ${offer.generation}`}
    //                     </p>
    //                     <IconAndText icon={faMoneyBillWave} text={` ${formatNumber(offer.price)} PLN`} />
    //                     <IconAndText icon={faCalendarAlt} text={` ${offer.year}`} />
    //                     <IconAndText icon={faForward} text={` ${offer.power} KM`} />
    //                     <IconAndText icon={faCube} text={` ${offer.volume} cm3`} />
    //                     <IconAndText icon={faRoad} text={` ${formatNumber(offer.kms)} km`} />
    //                 </div>
    //             </div>
    //             <div className="Offer-description">
    //                 <p className="Offer-description__text">
    //                     {offer.longDescription}
    //                 </p>
    //             </div></>
    //         }
    //     </div>
    )
}

export default Offer;
