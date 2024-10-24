import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import FallDetection from '../components/FallDetection';

const MonitoringScreen = ({ navigation }) => {
  const handleFallDetected = async () => {
    Alert.alert("Fall Detected", "An alert has been triggered!");

    // Send a notification to the server
    try {
      const response = await fetch('http://localhost:5000/api/admin-notifications/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user_id_here', // Replace with the actual user ID
          walkaway: null,
          fall: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }

      const data = await response.json();
      console.log('Notification sent:', data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FallDetection onFallDetected={handleFallDetected} />
      <Button title="Stop Monitoring" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MonitoringScreen;
