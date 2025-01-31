const express = require('express');
const Outlet = require('../../models/Outlet');
const User = require('../../models/User'); 
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.delete('/outlets/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params; // Outlet ID

     
        const outlet = await Outlet.findById(id);
        if (!outlet) {
            return res.status(404).json({ message: "Outlet not found" });
        }

       
        const manager = await User.findById(outlet.manager);
        if (manager && manager.role === 'outlet_manager') {
        
            const otherOutlets = await Outlet.find({ manager: manager._id, _id: { $ne: id } });
            if (otherOutlets.length === 0) {
              
                manager.role = 'consumer';
                await manager.save();
            }
        }

 
        await Outlet.findByIdAndDelete(id);

        res.status(200).json({ message: "Outlet deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;