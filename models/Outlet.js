const mongoose = require('mongoose');

const OutletSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Outlet', OutletSchema);
