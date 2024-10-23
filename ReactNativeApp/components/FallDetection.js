import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const FallDetection = ({ onFallDetected }) => {
  const [data, setData] = useState({});
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
    Accelerometer.setUpdateInterval(500); // Adjust to check every 0.5 seconds
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;

  // Simple fall detection logic based on a threshold
  const detectFall = () => {
    const threshold = 1.5; // Example threshold for fall detection, adjust as necessary
    const magnitude = Math.sqrt(x * x + y * y + z * z); // Calculate the magnitude of the acceleration
    if (magnitude > threshold) {
      console.log('Fall detected');
      onFallDetected(); // Trigger the callback when a fall is detected
    }
  };

  useEffect(() => {
    if (x !== undefined && y !== undefined && z !== undefined) {
      detectFall();
    }
  }, [x, y, z]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Accelerometer Data:</Text>
      <Text style={styles.data}>x: {x && x.toFixed(2)}</Text>
      <Text style={styles.data}>y: {y && y.toFixed(2)}</Text>
      <Text style={styles.data}>z: {z && z.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default FallDetection;
