
const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    business_name: { type: String, required: true },
    certification: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Business', BusinessSchema);