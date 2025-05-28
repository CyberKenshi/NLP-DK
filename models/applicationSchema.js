const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    country: { type: String, required: true },
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    major: { type: String, required: true },
    researchInterests: { type: String, required: true },
    motivation: { type: String, required: true },
    cvPath: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);