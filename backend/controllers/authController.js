const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



async function registerUser(req, res) {
    try {
        const { userName, userEmail, password, role } = req.body;

        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            userName,
            userEmail,
            password: hashedPassword,
            role
        })
        await user.save();
        return res.status(201).json({ success: true, message: "User registered successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(501).json({ success: false, message: `${error}` })
    }
}


const loginUser = async (req, res) => {
    try {
        const { userEmail, password } = req.body;

        if (!userEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const isExist = await User.findOne({ userEmail });

        if (!isExist) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, isExist.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const accessToken = jwt.sign(
            {
                _id: isExist._id,
                userEmail: isExist.userEmail,
                userName: isExist.userName,
                role: isExist.role,
            },
            'JWT_SECRET',
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            success: true,
            message: "Logged In Successfully!",
            accessToken,
            user: {
                _id: isExist._id,
                userEmail: isExist.userEmail,
                userName: isExist.userName,
                role: isExist.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};




module.exports = { registerUser, loginUser }