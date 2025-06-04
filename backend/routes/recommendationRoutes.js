const express = require('express');
const axios = require('axios');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const flaskResponse = await axios.post('http://localhost:5001/recommend', req.body);

        res.json(flaskResponse.data);
    } catch (error) {
        console.error('Error calling Flask API:', error.message);
        res.status(500).json({ error: 'Failed to fetch recommendation' });
    }
});

module.exports = router;