const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const connectDB = require('./config/database');
const setupAdminSocket = require('./sockets/adminSocket');
const mongoose = require('mongoose');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

// MongoDB ga ulanish
connectDB();

// Socket.io sozlamalari
setupAdminSocket(io);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/shop-owner', require('./routes/shopOwner'));
app.use('/api/shop', require('./routes/shop'));
app.use('/api/seller', require('./routes/seller'));
app.use('/api/assistant', require('./routes/assistant'));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Serverda xatolik yuz berdi"
    });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishlamoqda`);
});