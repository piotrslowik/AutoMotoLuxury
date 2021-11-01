import Origin from '../../Models/origin.js';

import { parseWithId } from './helpers.js';

export default {
    origins: async () => {
        try {
            const origins = await Origin.find();
            return origins.map(origin => {
                return parseWithId(origin);;
            });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    createOrigin: async args => {
        const origin = new Origin({
            origin: args.originInput.origin,
        });
        try {
            const result = await origin.save();
            return parseWithId(result);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    editOrigin: async args => {
        try {
            const origin = await Origin.findById(args.originEditInput.id);
            origin.origin = args.originEditInput.origin;
            const result = await origin.save();
            return parseWithId(result);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    deleteOrigin: async args => {
        try {
            const origin = await Origin.findById(args.originId);
            await Origin.deleteOne({_id: args.originId});
            return parseWithId(origin);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
}
