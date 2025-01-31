require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;


if (!MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env file");
    process.exit(1);
}


app.use(cors());
app.use(bodyParser.json());


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
});


app.use('/api/v1', require('./routes/customer-/login-api')); 
app.use('/api/v1', require('./routes/customer-/register-api')); 

app.use('/api/v1', require('./routes/gas-requests-/create-api')); 
app.use('/api/v1', require('./routes/gas-requests-/ferch-all-api')); 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});