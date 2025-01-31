
const express = require('express');
const GasRequest = require('../../models/GasRequest');
const User = require('../../models/User');
const authMiddleware = require('../../middleware/authMiddleware'); 

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

     
        res.status(201).json({ message: "Gas request created successfully", gasRequest: newGasRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;