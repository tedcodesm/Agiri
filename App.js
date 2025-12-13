import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import StackNavigator from './navigation/StackNavigator';
import LoginScreen from './screens/LoginScreen';
import VerifyOTP from './screens/OtpScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import { NotificationProvider } from './context/NotificationContext';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <NotificationProvider>
      <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StackNavigator />
      </GestureHandlerRootView>
    </UserProvider>
    </NotificationProvider>
  )
}

