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
});

export default model('User', userSchema);
