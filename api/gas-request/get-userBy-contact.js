const express = require('express');
const GasRequest = require('../../models/GasRequest');
const User = require('../../models/User');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();


router.get('/gas-requests/:mobileNumber', authMiddleware, async (req, res) => {
    try {
        const { mobileNumber } = req.params;

        if (!mobileNumber) {
            return res.status(400).json({ message: "Mobile number is required" });
        }

     
        const user = await User.findOne({ phone: mobileNumber });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

  
        if (req.user.userId !== user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

    
        const gasRequests = await GasRequest.find({ user: user._id });

 
        res.status(200).json({ message: "Gas requests retrieved successfully", gasRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;