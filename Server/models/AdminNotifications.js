const mongoose = require("mongoose");

// Define the schema for admin notifications
const AdminNotificationSchema = new mongoose.Schema(
    {
        walkaway: {
            type: String,
            default: "No patients off site.",
        },
        fall: {
            type: String,
            default: "No patients have fallen.",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

AdminNotificationSchema.pre("save", function () {
    const changes = this.getChanges();
    // No changes? Bump `updatedAt` anyway
    if (Object.keys(changes).length === 0) {
        this.set("updatedAt", new Date());
    }
});

// Function to update the walkaway notification based on patient location
AdminNotificationSchema.methods.updateWalkawayNotification = async function (
    patientLocation,
    googleMapsVacinity,
) {
    await this.populate("userId", "username");
    if (patientLocation !== googleMapsVacinity) {
        this.walkaway = `EMERGENCY: PATIENT ${this.userId.username} HAS WALKED OFFSITE!`;
    } else {
        this.walkaway = `Patient: ${this.userId.username} is onsite.`;
    }
};

// Function to update the fall notification based on a fall alert
AdminNotificationSchema.methods.updateFallNotification = async function (
    patientFall,
) {
    console.log("Entro");
    await this.populate("userId", "username");
    if (patientFall === true) {
        this.fall = `EMERGENCY: PATIENT ${this.userId.username} HAS FALLEN!`;
    } else {
        this.fall = `Patient: ${this.userId.username} has not fallen.`;
    }
};

// Create the model
const AdminNotification = mongoose.model(
    "AdminNotification",
    AdminNotificationSchema,
);

module.exports = AdminNotification;
