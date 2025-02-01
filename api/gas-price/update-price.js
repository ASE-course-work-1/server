const express = require('express');
const Price = require('../../models/Gas-Price');
const authMiddleware = require('../../middleware/authMiddleware');


const router = express.Router();

router.put('/prices/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { imageUrl, price, type, description } = req.body;

        if (!imageUrl || !price || !type || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

 
        const existingPrice = await Price.findById(id);
        if (!existingPrice) {
            return res.status(404).json({ message: "Price not found" });
        }

      
        existingPrice.imageUrl = imageUrl;
        existingPrice.price = price;
        existingPrice.type = type;
        existingPrice.description = description;

     
        await existingPrice.save();

    
        res.status(200).json({ message: "Price updated successfully", price: existingPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;