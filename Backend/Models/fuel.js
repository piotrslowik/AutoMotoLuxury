import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const fuelSchema = new Schema ({
  fuel: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
  },
});

export default model('Fuel', fuelSchema);
