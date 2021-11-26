import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const originSchema = new Schema ({
  origin: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
  },
});

export default model('Origin', originSchema);
