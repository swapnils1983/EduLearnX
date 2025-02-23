const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/check-auth', authenticate, (req, res) => {
    try {
        const user = req.user;

        return res.status(200).json({
            success: true,
            message: 'authenticated user!',
            data: {
                user
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,

        })
    }
})

module.exports = router