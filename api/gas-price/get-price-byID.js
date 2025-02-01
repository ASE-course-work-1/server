
const express = require('express');
const Price = require('../../models/Gas-Price');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/prices/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Find the price by ID
        const price = await Price.findById(id);
        if (!price) {
            return res.status(404).json({ message: "Price not found" });
        }

        // Respond with the price
        res.status(200).json({ message: "Price retrieved successfully", price });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;