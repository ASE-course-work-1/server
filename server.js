require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/User'); 


const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;


if (!MONGO_URI) {
    process.exit(1);
}


app.use(cors());
app.use(bodyParser.json());

const initializeAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            console.log('Admin user already exists.');
            return;
        }

        const adminUser = new User({
            account_type: 'Individual',
            nic:"000000000v",
            name: 'Admin',
            email: 'dinethwewalapanditha@gmail.com',
            phone: '1234567890',
            password: await bcrypt.hash('admin123', 10),
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error initializing admin user:', error);
    }
};


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    initializeAdmin(); 
}).catch((error) => {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
});

     //User Routes
app.use('/api/v1', require('./api/system-user/login')); 
app.use('/api/v1', require('./api/system-user/register')); 
app.use('/api/v1', require('./api/system-user/verify-OTP')); 
    //Gas Request Routes
app.use('/api/v1', require('./api/gas-request/create')); 
app.use('/api/v1', require('./api/gas-request/get-userBy-contact')); 
app.use('/api/v1', require('./api/gas-request/getAll-request')); 
    //Outlets Routes
app.use('/api/v1', require('./api/outlet-admin/register-outlet')); 
app.use('/api/v1', require('./api/outlet-admin/update-outlet')); 
app.use('/api/v1', require('./api/outlet-admin/delete-outlet')); 
app.use('/api/v1', require('./api/outlet-admin/getAll-outlets')); 
   //Price Routes
app.use('/api/v1', require('./api/gas-price/create'));
app.use('/api/v1', require('./api/gas-price/update-price'));
app.use('/api/v1', require('./api/gas-price/get-price-byID'));
app.use('/api/v1', require('./api/gas-price/getAll-price'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});