import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator'; 
import PropertyDetail from '../screens/PropertyDetail';
import Welcome from '../screens/Welcome'; 
import { useTheme } from '../context/ThemeContext';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { theme } = useTheme(); 
  const isDark = theme === 'dark';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? '#121212' : '#fff',
        },
        headerStyle: {
          backgroundColor: isDark ? '#121212' : '#fff',
        },
        headerTitleStyle: {
          color: isDark ? '#fff' : '#000',
        },
        headerTintColor: isDark ? '#FFD700' : '#0D1C84',
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen 
        name="PropertyDetail" 
        component={PropertyDetail} 
        options={{ 
          title: 'Property Details',
          headerShown: true,
          headerTitleAlign: 'center',
       }} />
    </Stack.Navigator>
  );
}
