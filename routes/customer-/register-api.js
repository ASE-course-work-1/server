
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const Business = require('../../models/Business'); 
const sendEmail = require('../../utils/sendEmail');

const router = express.Router();


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

        
        const newUser = new User({
            type,
            name,
            email,
            phone,
            password: hashedPassword,
            role
        });

 
        await newUser.save();

        if (type === 'Business') {
            if (!business_name || !certification) {
                return res.status(400).json({ message: "Business name and certification are required for business users" });
            }

            const newBusiness = new Business({
                user: newUser._id, 
                business_name,
                certification
            });

            await newBusiness.save();
        }

      
        const emailSubject = "Account Created Successfully";
        const emailText = `Hello ${name},\n\nYour account has been successfully created. Welcome to our platform!`;
        await sendEmail(email, emailSubject, emailText);

       
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
