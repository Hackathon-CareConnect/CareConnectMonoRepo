const mongoose = require('mongoose');

// Define the schema for admin notifications
const AdminNotificationSchema = new mongoose.Schema({
    walkaway: {
        type: String,
        default: "No patients off site."
    },
    fall: {
        type: String,
        default: "No patients have fallen."
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // This references the _id from the User model
        ref: 'User',
        required: true
    }
});

// Function to update the walkaway notification based on patient location
AdminNotificationSchema.methods.updateWalkawayNotification = async function(patientLocation, googleMapsVacinity) {
    await this.populate('userId', 'username'); // Populate the username from User model
    if (patientLocation !== googleMapsVacinity) {
        this.walkaway = `EMERGENCY: PATIENT ${this.userId.username} HAS WALKED OFFSITE!`;
    } else {
        this.walkaway = `Patient: ${this.userId.username} is onsite.`;
    }
};

// Function to update the fall notification based on a fall alert
AdminNotificationSchema.methods.updateFallNotification = async function(patientFall) {
    await this.populate('userId', 'username'); // Populate the username from User model
    if (patientFall === true) {
        this.fall = `EMERGENCY: PATIENT ${this.userId.username} HAS FALLEN!`;
    } else {
        this.fall = `Patient: ${this.userId.username} has not fallen.`;
    }
};

// Create the model
const AdminNotification = mongoose.model('AdminNotification', AdminNotificationSchema);

module.exports = AdminNotification;