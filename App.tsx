import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  
  );
}
export default App;