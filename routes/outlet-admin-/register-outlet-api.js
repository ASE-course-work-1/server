const express = require('express');
const Outlet = require('../../models/Outlet');
const User = require('../../models/User'); 
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

//manager id menas user id 
router.post('/outlets', authMiddleware, async (req, res) => {
    try {                       //manager id menas user id 
        const { name, location, managerId } = req.body;

       
        if (!name || !location || !managerId) {
            return res.status(400).json({ message: "Name, location, and manager ID are required" });
        }

      
        const manager = await User.findById(managerId);
        if (!manager) {
            return res.status(404).json({ message: "Manager not found" });
        }

     
        if (manager.role === 'outlet_manager' || manager.role === 'admin') {
            return res.status(400).json({ message: "User is already an outlet manager or admin" });
        }

    
        manager.role = 'outlet_manager';
        await manager.save();

    
        const newOutlet = new Outlet({
            name,
            location,
            manager: managerId 
        });

       
        await newOutlet.save();

       
        res.status(201).json({ message: "Outlet created successfully", outlet: newOutlet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;