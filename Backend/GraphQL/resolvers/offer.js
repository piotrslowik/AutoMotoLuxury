import Offer from '../../Models/offer.js';
import User from '../../Models/user.js';

import { parseOffer, parseWithId } from './helpers.js';

export default {
  offers: async () => {
    try {
      const offers = await Offer.find({ isDeleted: false });
      return offers.map(offer => parseOffer(offer));
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
  offerDetails: async args => {
    try {
      const offer = await Offer.findOne({ _id: args.offerId, isDeleted: false });
      return parseOffer(offer);
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
  createOffer: async args => {
    const offer = new Offer({
      makeId: args.offerInput.make,
      modelId: args.offerInput.model,
      fuelId: args.offerInput.fuel,
      generation: args.offerInput.generation,
      price: args.offerInput.price,
      power: args.offerInput.power,
      year: args.offerInput.year,
      volume: args.offerInput.volume,
      kms: args.offerInput.kms,
      photos: args.offerInput.photos,
      shortDescription: args.offerInput.shortDescription,
      longDescription: args.offerInput.longDescription,
      date: args.offerInput.date,
      creator:  args.offerInput.creator,
      isDeleted: false,
    });
    try {
      const creator = await User.findById(args.offerInput.creator);
      creator.createdOffers.push(offer);
      await creator.save();
      const result = await offer.save();
      return parseOffer(result);
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteOffer: async args => {
    try {
      const offer = await Offer.findById(args.offerId);
      offer.isDeleted = true;
      const result = await offer.save();
      return parseWithId(result);
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
  hardDeleteOffer: async args => {
    try {
      const offer = await Offer.findById(args.offerId);
      await Offer.deleteOne({_id: args.offerId});
      return parseWithId(offer);
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }
}
