import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema ({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOffers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Offer',
    }
  ],
  observedOffers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Offer',
    }
  ],
  isDeleted: {
    type: Boolean,
  },
  isAdmin: {
    type: Boolean,
  },
});

export default model('User', userSchema);
