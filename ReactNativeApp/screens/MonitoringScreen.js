import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import FallDetection from '../components/FallDetection';

const MonitoringScreen = ({ navigation }) => {
  const handleFallDetected = () => {
    Alert.alert("Fall Detected", "An alert has been triggered!");
    // Here you can also send notifications or SMS to caregivers
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
