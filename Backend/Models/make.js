import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const makeSchema = new Schema ({
  make: {
    type: String,
    required: true,
  },
  originId: {
    type: Schema.Types.ObjectId,
    ref: 'Origin',
  },
  isDeleted: {
    type: Boolean,
  },
});

export default model('Make', makeSchema);
