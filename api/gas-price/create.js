
const express = require('express');
const Price = require('../../models/Gas-Price');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/prices', authMiddleware, async (req, res) => {
    try {
        const { imageUrl, price, type, description } = req.body;

      
        if (!imageUrl || !price || !type || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

       
        const newPrice = new Price({
            imageUrl,
            price,
            type,
            description
        });

       
        await newPrice.save();

   
        res.status(201).json({ message: "Price created successfully", price: newPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = router;