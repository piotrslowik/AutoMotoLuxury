import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const fuelSchema = new Schema ({
    fuel: {
        type: String,
        required: true,
    },
});

export default model('Fuel', fuelSchema);
