const express = require('express');
const AdminNotification = require('../models/AdminNotifications');
const router = express.Router();

// Get all notifications for a specific user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await AdminNotification.find({ userId });
        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this user.' });
        }
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Create or update a specific notification
router.post('/create', async (req, res) => {
    const { userId, walkaway, fall } = req.body;
    try {
        const notification = new AdminNotification({ userId, walkaway, fall });
        await notification.save();
        res.json({ message: 'Notification created/updated successfully', notification });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create/update notification', error });
    }
});

module.exports = router;