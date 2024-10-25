const express = require("express");
const AdminNotification = require("../models/AdminNotifications");
const router = express.Router();

// Get all notifications for a specific user
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await AdminNotification.findOne({ userId }).sort({
            created_at: -1,
        });
        if (!notifications || notifications.length === 0) {
            return res
                .status(404)
                .json({ message: "No notifications found for this user." });
        }
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Create or update a specific notification
router.post("/create", async (req, res) => {
    const { userId, walkaway, fall } = req.body;
    try {
        let notification = await AdminNotification.findOne({ userId });

        if (notification) {
            notification.walkaway = walkaway;
            notification.fall = fall;
            await notification.save();
            return res.json({
                message: "Notification updated successfully",
                notification,
            });
        } else {
            notification = new AdminNotification({ userId, walkaway, fall });
            await notification.save();
            return res.json({
                message: "Notification created successfully",
                notification,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Failed to create/update notification",
            error,
        });
    }
});

module.exports = router;
