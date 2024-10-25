import React from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import FallDetection from "../components/FallDetection";
import axios from "axios";

const MonitoringScreen = ({ navigation }) => {
    const URL =
        "https://swplg9vx-5000.use.devtunnels.ms/api/notifications/create";
    const handleFallDetected = async () => {
        Alert.alert("Fall Detected", "An alert has been triggered!");

        // Send a notification to the server
        try {
            const response = await axios.post(URL, {
                userId: "671ba6db060fa28c9abb7b66",
                walkaway: null,
                fall: `EMERGENCY: PATIENT IN Room 301 HAS FALLEN!`,
            });
            console.log(`Notification sent:  ${response}`);
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    };

    return (
        <View style={styles.container}>
            <FallDetection onFallDetected={handleFallDetected} />
            <Button
                title="Stop Monitoring"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default MonitoringScreen;
