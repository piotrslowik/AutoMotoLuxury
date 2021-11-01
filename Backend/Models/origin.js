import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const originSchema = new Schema ({
    origin: {
        type: String,
        required: true,
    },
});

export default model('Origin', originSchema);
