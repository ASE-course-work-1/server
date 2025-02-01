const mongoose = require('mongoose');

const GasRequestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    request_status: { type: String, enum: ['pending', 'delivered','cancled'], default: 'pending' },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GasRequest', GasRequestSchema);
