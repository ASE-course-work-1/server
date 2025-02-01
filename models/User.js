

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    account_type: { type: String, enum: ['Individual', 'Business'], required: true }, 
    nic: { type: String, unique: true, required: true }, 
    name: { type: String, required: true }, 
    email: { type: String, unique: true, required: true }, 
    phone: { type: String, unique: true, required: true }, 
    password: { type: String, required: true }, 
    otp: { type: String, required: false }, 
    role: { type: String, enum: ['consumer', 'outlet_manager', 'admin'], required: true } ,
    business_reg: { type: String}
  
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
