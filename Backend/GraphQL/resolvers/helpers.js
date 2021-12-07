import User from '../../Models/user.js';
import Origin from '../../Models/origin.js';
import Make from '../../Models/make.js';
import Model from '../../Models/model.js';
import Offer from '../../Models/offer.js';
import Fuel from  '../../Models/fuel.js';

export const parseWithId = data => {
    return {
        ...data._doc,
        _id: data.id,
    }
};
export const offers = async offerIDs => {
    try {
        const offers = await Offer.find({_id: {$in: offerIDs}});
        return offers.map(offer => {
            return {
                ...parseWithId(offer),
                creator: user.bind(this, offer._doc.creator),
            };
        });
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...parseWithId(user),
            createdOffers: offers.bind(this, user._doc.createdOffers),
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const origin = async originId => {
    try {
        const origin = await Origin.findById(originId);
        return parseWithId(origin);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const make = async makeId => {
    try {
        const make = await Make.findById(makeId);
        return {
            ...parseWithId(make),
            origin: origin.bind(this, make._doc.originId),
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
export const model = async modelId => {
    try {
        const model = await Model.findById(modelId);
        return {
            ...parseWithId(model),
            origin: origin.bind(this, model._doc.originId),
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
export const fuel = async fuelId => {
    try {
        const fuel = await Fuel.findById(fuelId);
        return {
            ...parseWithId(fuel),
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const parseOffer = offer => {
    return { 
        ...offer._doc,
        _id: offer.id,
        date: new Date(offer._doc.date).toISOString(),
        make: make.bind(this, offer._doc.makeId),
        model: model.bind(this, offer._doc.modelId),
        fuel: fuel.bind(this, offer._doc.fuelId),
        creator: user.bind(this, offer._doc.creator),
    };
}

export class Error {
  constructor(message, path = null) {
    this.message = message;
    this.path = path;
  }
}