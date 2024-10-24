const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const adminNotificationRoutes = require('./routes/adminNotifications'); // Import your admin notifications routes

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notifications', adminNotificationRoutes); // Set up the notifications route

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI||"mongodb+srv://zachlyons1212:KXlHJ64QiNgnSAv9@careconnectdb.xtthl.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});