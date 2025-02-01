const express = require('express');
const Price = require('../../models/Gas-Price');

const router = express.Router();

router.get('/prices', async (req, res) => {
    try {
      
        const prices = await Price.find();

      
        res.status(200).json({ message: "Prices retrieved successfully", prices });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = router;
