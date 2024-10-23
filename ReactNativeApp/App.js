import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import MonitoringScreen from './screens/MonitoringScreen';

const punycode = require('punycode'); //ASCII-compatible, makes sure that DNS can understand website with special characters. **Doesn't fix error.
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Monitoring" component={MonitoringScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
