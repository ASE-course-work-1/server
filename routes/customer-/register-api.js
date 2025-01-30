const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const sendEmail = require('../../utils/sendEmail');


const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

      
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

    
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or phone already in use" });
        }

       
      // const hashedPassword = await bcrypt.hash(password, 10);

    
       // const newUser = new User({ name, email, phone, password: hashedPassword });
        const newUser = new User({ name, email, phone, password});
        await newUser.save();

       
        const emailSubject = "Account Created Successfully";
        const emailText = `Hello ${name},\n\nYour account has been successfully created. Welcome to our platform!`;
        await sendEmail(email, emailSubject, emailText);

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


module.exports = router;
