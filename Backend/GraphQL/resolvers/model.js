import Model from '../../Models/model.js';

import { make, parseWithId } from './helpers.js';

export default {
  models: async args => {
    try {
      const models = await Model.find({ makeId: args.makeId, isDeleted: false });
      return models.map(model => (
        { 
          ...parseWithId(model),
          make: make.bind(this, model._doc.makeId),
        }
      ));
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
  createModel: async (args, req) => {
    if (!req.isAdmin) return new Error('Brak uprawnień administratora');
    const model = new Model({
      model: args.modelInput.model,
      makeId: args.modelInput.makeId,
      isDeleted: false,
    });
    try {
      const result = await model.save();
      return {
        ...parseWithId(result),
        make: make.bind(this, result._doc.makeId),
      };
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
  editModel: async (args, req) => {
    if (!req.isAdmin) return new Error('Brak uprawnień administratora');
    try {
      const model = await Model.findById(args.modelEditInput.modelId);
      model.model = args.modelEditInput.model;
      model.makeId = args.modelEditInput.makeId;
      const result = await model.save();
      return {
        ...parseWithId(result),
        make: make.bind(this, result._doc.makeId),
      };
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteModel: async (args, req) => {
    if (!req.isAdmin) return new Error('Brak uprawnień administratora');
    try {
      const model = await Model.findById(args.modelId);
      model.isDeleted = true;
      const result = await model.save();
      return parseWithId(result);
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
  hardDeleteModel: async (args, req) => {
    if (!req.isAdmin) return new Error('Brak uprawnień administratora');
    try {
      const model = await Model.findById(args.modelId);
      await Model.deleteOne({_id: args.modelId});
      return parseWithId(model);
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
}
