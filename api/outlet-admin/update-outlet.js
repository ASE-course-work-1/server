const express = require('express');
const Outlet = require('../../models/Outlet');
const User = require('../../models/User'); 
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();


router.put('/outlets/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params; // Outlet ID
        const { name, location, managerId } = req.body; 

      
        if (!name && !location && !managerId) {
            return res.status(400).json({ message: "At least one field (name, location, or managerId) is required" });
        }

     
        const outlet = await Outlet.findById(id);
        if (!outlet) {
            return res.status(404).json({ message: "Outlet not found" });
        }

    
        if (name) outlet.name = name;
        if (location) outlet.location = location;

      
        if (managerId) {
    
            const newManager = await User.findById(managerId);
            if (!newManager) {
                return res.status(404).json({ message: "New manager not found" });
            }

          
            if (newManager.role === 'outlet_manager' || newManager.role === 'admin') {
                return res.status(400).json({ message: "User is already an outlet manager or admin" });
            }

      
            newManager.role = 'outlet_manager';
            await newManager.save();

       
            if (outlet.manager) {
                const previousManager = await User.findById(outlet.manager);
                if (previousManager && previousManager.role === 'outlet_manager') {
                    previousManager.role = 'consumer';
                    await previousManager.save();
                }
            }

     
            outlet.manager = managerId;
        }

 
        await outlet.save();

     
        res.status(200).json({ message: "Outlet updated successfully", outlet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;