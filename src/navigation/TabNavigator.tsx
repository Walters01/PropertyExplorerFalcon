import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import Feather from 'react-native-vector-icons/Feather';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName = '';
                if (route.name === 'Home') {
                iconName = 'home';
                } else if (route.name === 'Favorites') {
                iconName = 'heart';
                } else if (route.name === 'Profile') {
                iconName = 'user';
                }
                return <Feather name={iconName} size={size} color={color} />;
            },
           tabBarActiveTintColor: '#0D1C84',     
           tabBarInactiveTintColor: '#999999',   
           tabBarLabelStyle: {
            fontSize: 12,
           },
        })}>
      <Tab.Screen name="Home" component={Dashboard} options={{headerShown: false,}} />
      <Tab.Screen name="Favorites" component={Favorites} options={{headerShown: true, headerTitleAlign: 'center' }} />
      <Tab.Screen name="Profile" component={Profile} options={{headerShown: false,}} />
  
    </Tab.Navigator>
  );
}
