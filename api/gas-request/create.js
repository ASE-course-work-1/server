
const express = require('express');
const GasRequest = require('../../models/GasRequest');
const User = require('../../models/User');
const Token = require('../../models/Token'); 
const authMiddleware = require('../../middleware/authMiddleware');
const sendEmail = require('../../utils/sendEmail');
const { v4: uuidv4 } = require('uuid'); 

const router = express.Router();


router.post('/gas-requests', authMiddleware, async (req, res) => {
    try {
      
        const userId = req.user.userId;

      
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newGasRequest = new GasRequest({
            user: userId,
            request_status: 'pending' 
        });

      
        await newGasRequest.save();

        const tokenCode = uuidv4();

       
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 24);

   
        const newToken = new Token({
            request: newGasRequest._id, 
            token_code: tokenCode,
            // status: 'valid',
            expiry_date: expiryDate
        });

     
        await newToken.save();

        const emailSubject = "Gas Request Token";
        const emailText = `Hello ${user.name},\n\nYour gas request has been successfully created. Here is your token:\n\nToken: ${tokenCode}\n\nThis token will expire on ${expiryDate.toLocaleString()}.\n\nThank you for using our service!`;
        await sendEmail(user.email, emailSubject, emailText);

       
        res.status(201).json({
            message: "Gas request created successfully",
            gasRequest: newGasRequest,
            token: newToken
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
