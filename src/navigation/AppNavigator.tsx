import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator'; // your current bottom tab
import PropertyDetail from '../screens/PropertyDetail';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
