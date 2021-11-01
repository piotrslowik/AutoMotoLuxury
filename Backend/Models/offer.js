import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const offerSchema = new Schema ({
    makeId: {
        type: Schema.Types.ObjectId,
        ref: 'Make',
    },
    modelId: {
        type: Schema.Types.ObjectId,
        ref: 'Model',
    },
    fuelId: {
        type: Schema.Types.ObjectId,
        ref: 'Fuel',
    },
    generation: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    power: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    volume: {
        type: Number,
        required: true,
    },
    kms: {
        type: Number,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    longDescription: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

export default model('Offer', offerSchema);
