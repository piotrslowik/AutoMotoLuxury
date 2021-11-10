import React, { useState, useEffect } from 'react';

import ImageGallery from 'react-image-gallery';

import Loader from '../../components/Shared/Loader';
import IconAndText from '../../components/Shared/IconAndText';

import { faCalendarAlt, faForward, faCube, faRoad, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'

import { getOfferDetails } from '../../logic/graphql/offer';
import { formatNumber } from '../../logic/helpers';

import { useSelector, useDispatch } from 'react-redux';
import offerActions  from '../../store/actions/offer';

const Offer = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const offer = useSelector(state => state.offer);
    const dispatch = useDispatch();
    //const [offer, setOffer] = useState({});
    const [images, setImages] = useState([]);

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
        <div className="Offer flex-column-center">
            {isLoading
            ?   <Loader text="Pobieranie danych" />
            :   <><div className="Offer-main">
                    <ImageGallery items={images} />
                    <div className="Offer-data">
                        <p className="Offer-data__name">
                            {`${offer.make.make} ${offer.model.model} ${offer.generation}`}
                        </p>
                        <IconAndText icon={faMoneyBillWave} text={` ${formatNumber(offer.price)} PLN`} />
                        <IconAndText icon={faCalendarAlt} text={` ${offer.year}`} />
                        <IconAndText icon={faForward} text={` ${offer.power} KM`} />
                        <IconAndText icon={faCube} text={` ${offer.volume} cm3`} />
                        <IconAndText icon={faRoad} text={` ${formatNumber(offer.kms)} km`} />
                    </div>
                </div>
                <div className="Offer-description">
                    <p className="Offer-description__text">
                        {offer.longDescription}
                    </p>
                </div></>
            }
        </div>
    )
}

export default Offer;
