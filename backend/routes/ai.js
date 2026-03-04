const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();
const rateLimit = require('express-rate-limit');

// Basic rate limiting for AI routes
const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per windowMs
    message: 'Too many requests to AI service from this IP, please try again after 15 minutes'
});

// Dynamic import for node-fetch since it's an ESM module in the latest versions
// Or we can just use the global fetch available in Node.js 18+
// We'll use the native fetch API available in Node >= 18.

router.post('/chat', protect, aiLimiter, async (req, res) => {
    try {
        const aiServiceUrl = process.env.PYTHON_AI_URL || 'http://localhost:8000';

        const response = await fetch(`${aiServiceUrl}/api/ai/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ message: `AI Service Error: ${errorText}` });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error proxying to AI service:', error);
        res.status(500).json({ message: 'Failed to communicate with AI service' });
    }
});

router.post('/recommend', protect, aiLimiter, async (req, res) => {
    try {
        const aiServiceUrl = process.env.PYTHON_AI_URL || 'http://localhost:8000';

        const response = await fetch(`${aiServiceUrl}/api/ai/recommend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body) // Should contain userMessage and products list
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ message: `AI Service Error: ${errorText}` });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error proxying to AI service:', error);
        res.status(500).json({ message: 'Failed to communicate with AI service' });
    }
});

module.exports = router;
