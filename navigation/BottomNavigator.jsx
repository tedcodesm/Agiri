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
      borderTopLeftRadius: 80,   
      borderTopRightRadius: 80,  
      borderBottomLeftRadius: 80,  
      borderBottomRightRadius: 80,  
      position: "absolute",     
      left: 10,
      right: 10,
      bottom: 10,
      height: 60,               
      elevation: 5,            
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
          tabBarLabel: "Crops",
          tabBarIcon: ({ focused }) => (
            <Icon name="chart-bar" size={25} color={focused ? "black" : "white"} />
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