require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const chatRoutes = require('./routes/chats');
const aiRoutes = require('./routes/ai');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Flexible CORS for Vercel
app.use(cors({
    origin: (origin, callback) => {
        // Allow local development and any vercel project URL
        if (!origin || origin.includes('localhost') || origin.includes('vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/ai', aiRoutes);

// Database connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aishopping';

// Only connect and listen if we're not in a serverless environment
// Vercel will handle the connection differently or we can connect in the handler
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            if (process.env.VERCEL) {
                console.log('Running on Vercel');
            } else {
                app.listen(PORT, () => {
                    console.log(`Server running on port ${PORT}`);
                });
            }
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
        });
}

module.exports = app;
