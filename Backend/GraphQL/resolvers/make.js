import Make from '../../Models/make.js';

import { origin, parseWithId } from './helpers.js';

export default {
    makes: async () => {
        try {
            const makes = await Make.find();
            return makes.map(make => {
                return { 
                    ...parseWithId(make),
                    origin: origin.bind(this, make._doc.originId),
                };
            });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    createMake: async args => {
        const make = new Make({
            make: args.makeInput.make,
            originId: args.makeInput.originId,
        });
        try {
            const result = await make.save();
            return {
                ...parseWithId(result),
                origin: origin.bind(this, result._doc.originId)
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    editMake: async args => {
        try {
            const make = await Make.findById(args.makeEditInput.makeId);
            make.make = args.makeEditInput.make;
            make.originId = args.makeEditInput.originId;
            const result = await make.save();
            return {
                ...parseWithId(result),
                origin: origin.bind(this, result._doc.originId),
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    deleteMake: async args => {
        try {
            const make = await Make.findById(args.makeId);
            await Make.deleteOne({_id: args.makeId});
            return parseWithId(make);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
}
