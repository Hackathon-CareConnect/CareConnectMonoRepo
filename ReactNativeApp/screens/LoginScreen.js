import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Input } from 'react-native-elements';  // Ensure you have react-native-elements installed

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here (API call)
    if (email && password) {
      // Mock login function for demonstration
      Alert.alert('Login successful', `Welcome, ${email}!`);
      // Navigate to a home or dashboard screen after successful login
      navigation.navigate('Home');  // Adjust this to your actual screen
    } else {
      Alert.alert('Error', 'Please enter a valid email and password or sign up.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Fall Detection App</Text>
      <Input
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={value => setEmail(value)}
        value={email}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={value => setPassword(value)}
        value={password}
      />
      <Button
        title="Login"
        onPress={handleLogin}
      />
      <Button
        title="Sign up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoginScreen;