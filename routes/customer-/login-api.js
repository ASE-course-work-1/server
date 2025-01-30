// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../../models/User'); 

// const router = express.Router();


// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

       
//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password are required" });
//         }

       
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

       
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

     
//         const token = jwt.sign(
//             { userId: user._id, email: user.email }, // Removed role from here
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' } // Token expires in 1 hour
//         );

       
//         res.status(200).json({ message: "Login successful", token });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });






// module.exports = router;



const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/User'); 

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
