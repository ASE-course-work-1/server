const express = require('express');
const GasRequest = require('../../models/GasRequest');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/gas-requests', authMiddleware, async (req, res) => {
    try {
      
        const gasRequests = await GasRequest.find().populate('user', 'name email phone role');

        res.status(200).json({ message: "Gas requests retrieved successfully", gasRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;