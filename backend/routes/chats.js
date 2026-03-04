const express = require('express');
const Chat = require('../models/Chat');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/chats
router.get('/', protect, async (req, res) => {
    try {
        const chats = await Chat.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/chats/:id
router.get('/:id', protect, async (req, res) => {
    try {
        const chat = await Chat.findOne({ _id: req.params.id, userId: req.user.id });
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/chats
router.post('/', protect, async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ message: 'Messages array is required' });
        }

        const chat = await Chat.create({
            userId: req.user.id,
            messages
        });

        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/chats/:id
router.put('/:id', protect, async (req, res) => {
    try {
        const { message } = req.body; // e.g. { role: 'user', content: 'hello' }

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const chat = await Chat.findOne({ _id: req.params.id, userId: req.user.id });
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        chat.messages.push(message);
        await chat.save();

        res.json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
