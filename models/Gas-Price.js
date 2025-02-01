const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    price: { type: String, required: true },
    type: { type: String, enum: ['15.5Kg', '5Kg', '2.3Kg'], required: true },
    description: { type: String, required: true },
  });

module.exports = mongoose.model('Price', PriceSchema);