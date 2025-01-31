const express = require('express');
const Outlet = require('../../models/Outlet');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();


router.get('/outlets', authMiddleware, async (req, res) => {
    try {
      
        const outlets = await Outlet.find().populate('manager', 'name email phone role');

      
        res.status(200).json({ message: "Outlets retrieved successfully", outlets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;