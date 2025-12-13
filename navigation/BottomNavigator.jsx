import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WeatherCard from '../screens/TestWeather';
import CropScreen from '../screens/CropScreen';


const Tab = createBottomTabNavigator(); 

const BottomNavigator = () => {
  return (
    <Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: "black",
    tabBarInactiveTintColor: "white",
    tabBarStyle: {
      backgroundColor: "#84cc16",
      borderTopLeftRadius: 80,   // rounded top corners
      borderTopRightRadius: 80,  // rounded top corners
      borderBottomLeftRadius: 80,  // rounded top corners
      borderBottomRightRadius: 80,  // rounded top corners
      position: "absolute",      // make it float
      left: 10,
      right: 10,
      bottom: 10,
      height: 60,                // adjust height if needed
      elevation: 5,              // shadow for Android
    },
    headerShown: false,
  }}
>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon name="home" size={25} color={focused ? "black" : "white"} />
          ),
        }}
      />
      <Tab.Screen
        name="not"
        component={CropScreen}
        options={{
          tabBarLabel: "Crop",
          tabBarIcon: ({ focused }) => (
            <Icon name="crop" size={25} color={focused ? "black" : "white"} />
          ),
        }}
      />
      <Tab.Screen
        name="prof"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Icon name="account" size={25} color={focused ? "black" : "white"} />
          ),
        }}
      />
      
   
     
       
    </Tab.Navigator>
  );
};

export default BottomNavigator;