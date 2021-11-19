import Axios from 'axios';

import { arrayToGraphQLString } from '../helpers';

export const addOffer = async (makeId, modelId, gen, fuelId, year, kms, volume, power, price, shortDesc, longDesc, folderName, images) => {

    try {
        const imagesUrls = await getImagesUrls(images, folderName);

        const date = new Date();
        const query = `
            mutation {
                createOffer(offerInput:{
                    make: "${makeId}",
                    model: "${modelId}",
                    generation: "${gen}",
                    fuel: "${fuelId}",
                    year: ${year},
                    kms: ${kms},
                    volume: ${volume},
                    power: ${power},
                    price: ${price},
                    shortDescription: "${shortDesc}",
                    longDescription: "${longDesc}",
                    photos: [${arrayToGraphQLString(imagesUrls)}],
                    date: "${date.toISOString()}",
                    creator: "5da4fd3696b86f186c140515",
                })
                {
                    _id
                }
            }
        `;
        const result = await Axios.post('http://localhost:8000/graphql', {
            query: query,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result.data.data.createOffer;
    }
    catch (error) {
        console.error('GraphQL request failed', error);
    }
}

const uploadImgToCloudinary = async (img, folderName) => {
    try {
        let data = new FormData();

        data.append('image', img, img.name);
        data.append('folderName', folderName);

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        const result = await Axios.post('http://localhost:8000/upload/images', data, config)
        return result.data;
    }
    catch (error) {
        console.error(error)
    }
}

const getImagesUrls = async (images, folderName) => {
    try {
        return Promise.all(images.map(async img => await uploadImgToCloudinary(img, folderName)));
    }
    catch (error) {
        console.error('Could not upload images to Cloudinary\n', error);
        return [];
    }
}

export const getOffers = async (filterSetup) => {
    const query = `
    query {
        offers {
            _id,
            make {
              make
            },
            model {
              model
            },
            fuel {
              fuel
            },
            generation,
            price,
            power,
            year,
            volume,
            kms,
            photos,
            shortDescription,
            date,     
        }
    }
    `;
    try {
        const result = await Axios.post('http://localhost:8000/graphql', {
            query: query,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result.data.data.offers;
    }
    catch (error) {
        console.error('Could not fetch offers\n', error);
        return [];
    }
}
export const getOfferDetails = async offerId => {
    const query = `
    query {
        offerDetails(offerId: "${offerId}") {
            _id,
            make {
              make
            },
            model {
              model
            },
            fuel {
              fuel
            },
            generation,
            price,
            power,
            year,
            volume,
            kms,
            photos,
            shortDescription,
            longDescription,
            date,     
            creator {
                email
                createdOffers {
                  _id
                },
              }
        }
    }
    `;
    try {
        const result = await Axios.post('http://localhost:8000/graphql', {
            query: query,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result.data.data.offerDetails;
    }
    catch (error) {
        console.error("Could not fetch offer\n", error);
        return {};
    }
}
