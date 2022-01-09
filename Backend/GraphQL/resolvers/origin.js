import Origin from '../../Models/origin.js';

import { parseWithId } from './helpers.js';

export default {
  origins: async () => {
    try {
      const origins = await Origin.find({ isDeleted: false });
      return origins.map(origin => parseWithId(origin));
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
  createOrigin: async (args, req) => {
    if (!req.isAdmin) return new Error('Brak uprawnień administratora');
    const origin = new Origin({
      origin: args.originInput.origin,
      isDeleted: false,
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
  editOrigin: async (args, req) => {
    if (!req.isAdmin) return new Error('Brak uprawnień administratora');
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
  deleteOrigin: async (args, req) => {
    if (!req.isAdmin) return new Error('Brak uprawnień administratora');
    try {
      const origin = await Origin.findById(args.originId);
      origin.isDeleted = true;
      const result = await origin.save();
      return parseWithId(result);
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
  hardDeleteOrigin: async (args, req) => {
    if (!req.isAdmin) return new Error('Brak uprawnień administratora');
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
