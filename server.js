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
        const adminUsers = [
            {
                type: 'Individual',
                name: 'Admin',
                email: 'dinethwewalapanditha@gmail.com',
                phone: '1234567890',
                password: await bcrypt.hash('admin123', 10),
                role: 'admin'
            },
            {
                type: 'Individual',
                name: 'Admin',
                email: 'dilvtal5@gmail.com',
                phone: '1234567891', // Changed phone number to avoid conflicts
                password: await bcrypt.hash('123', 10),
                role: 'admin'
            }
        ];

        for (const admin of adminUsers) {
            const existingAdmin = await User.findOne({
                $or: [{ email: admin.email }, { phone: admin.phone }]
            });

            if (!existingAdmin) {
                await User.create(admin);
                console.log(`Admin user created: ${admin.email}`);
            } else {
                console.log(`Admin already exists: ${admin.email}`);
            }
        }
    } catch (error) {
        console.error('Error initializing admin users:', error);
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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});