import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SignupScreen from '../screens/SignupScreen';
import DrawerNavigator from './DrawerNavigator';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import VerifyOTP from '../screens/OtpScreen';
import NotificationScreen from '../screens/NotificationScreen';
import WeatherCard from '../screens/TestWeather';
import CropScreen from '../screens/CropScreen';

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="splash" component={SplashScreen} options={{headerShown:false}} />
    <Stack.Screen name="bottom" component={DrawerNavigator} options={{headerShown:false}} />
    <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}} />
    <Stack.Screen name="not" component={NotificationScreen} options={{headerShown:false}} />
    <Stack.Screen name="signup" component={SignupScreen} options={{headerShown:false}} />
    <Stack.Screen name="otp" component={VerifyOTP} options={{headerShown:false}} />
    <Stack.Screen name="weather" component={WeatherCard} options={{headerShown:false}} />
    <Stack.Screen name="crop" component={CropScreen} options={{headerShown:false}} />
    
    </Stack.Navigator>

  </NavigationContainer>
  )
}

export default StackNavigator