const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    request: { type: mongoose.Schema.Types.ObjectId, ref: 'GasRequest', required: true },
    token_code: { type: String, unique: true, required: true },
    status: { type: String, enum: ['valid', 'used'], default: 'valid' },
    expiry_date: { type: Date, required: true }
});

module.exports = mongoose.model('Token', TokenSchema);
