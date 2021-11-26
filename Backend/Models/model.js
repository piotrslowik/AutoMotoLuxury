import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const modelSchema = new Schema ({
  model: {
    type: String,
    required: true,
  },
  makeId: {
    type: Schema.Types.ObjectId,
    ref: 'Make',
  },
  isDeleted: {
    type: Boolean,
  },
});

export default model('Model', modelSchema);
