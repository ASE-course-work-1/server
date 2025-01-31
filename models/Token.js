
const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    request: { type: mongoose.Schema.Types.ObjectId, ref: 'GasRequest', required: true }, // Reference to GasRequest
    token_code: { type: String, unique: true, required: true }, // Unique token code
    status: { type: String, enum: ['valid', 'used'], default: 'valid' }, // Token status
    expiry_date: { type: Date, required: true } // Token expiry date
}, { timestamps: true });

module.exports = mongoose.model('Token', TokenSchema);
