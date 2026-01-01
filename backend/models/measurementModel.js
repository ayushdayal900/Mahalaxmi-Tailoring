const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    profileName: {
        type: String,
        required: true,
        default: 'My Measurements'
    },
    // Upper Body
    shoulder: { type: Number, required: true },
    bust: { type: Number },
    chest: { type: Number }, // For men or general
    waist: { type: Number, required: true },
    armHole: { type: Number },
    sleeveLength: { type: Number },
    bicep: { type: Number },

    // Lower Body
    hips: { type: Number, required: true },
    inseam: { type: Number },
    length: { type: Number, required: true }, // Full body or garment length
    thigh: { type: Number },

    // Metdata
    unit: {
        type: String,
        enum: ['inch', 'cm'],
        default: 'inch'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Measurement', measurementSchema);
