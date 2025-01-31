const express = require('express');
const GasRequest = require('../../models/GasRequest'); 
const User = require('../../models/User'); 

const router = express.Router();

router.get('/gas-requests/:userId', async (req, res) => {
    try {
        const { userId } = req.params; 

   
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

      
        const gasRequests = await GasRequest.find({ user: userId });

        res.status(200).json({ message: "Gas requests retrieved successfully", gasRequests });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;