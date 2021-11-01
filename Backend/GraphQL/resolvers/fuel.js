import Fuel from '../../Models/fuel.js';

import { parseWithId } from './helpers.js';

export default {
    fuels: async () => {
        try {
            const fuels = await Fuel.find();
            return fuels.map(fuel => {
                return parseWithId(fuel);
            });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    createFuel: async args => {
        const fuel = new Fuel({
            fuel: args.fuelInput.fuel,
        });
        try {
            const result = await fuel.save();
            return parseWithId(result);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    editFuel: async args => {
        try {
            const fuel = await Fuel.findById(args.fuelEditInput.id);
            fuel.fuel = args.fuelEditInput.fuel;
            const result = await fuel.save();
            return parseWithId(result);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    deleteFuel: async args => {
        try {
            const fuel = await Fuel.findById(args.fuelId);
            await fuel.deleteOne({_id: args.fuelId});
            return parseWithId(fuel);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
}
