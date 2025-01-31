
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const Business = require('../../models/Business'); 
const sendEmail = require('../../utils/sendEmail');

const router = express.Router();


const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


// Register Route
router.post('/register', async (req, res) => {
    try {
        const { type, name, email, phone, password, role, business_name, certification } = req.body;

        if (!type || !name || !email || !phone || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or phone already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();

        const newUser = new User({
            type,
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            otp
        });

        await newUser.save();

        const emailSubject = "Verify Your Email - OTP Code";
        const emailText = `Hello ${name},\n\nYour OTP code is: ${otp}. Please verify your email to complete registration.`;
        await sendEmail(email, emailSubject, emailText);

        res.status(200).json({ message: "OTP sent to email. Please verify." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = router;

