import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

import type { StackNavigationProp } from '@react-navigation/stack';

type WelcomeProps = {
  navigation: StackNavigationProp<any, any>;
};

const Welcome = ({ navigation }: WelcomeProps) => {
     const { theme } = useTheme();
     const isDark = theme === 'dark';
     const styles = getStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <Image
       
        source={require('../../assets/images/cover.jpg')} 
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>Find Your{'\n'}<Text style={styles.bold}>Best Property</Text></Text>
        <Text style={styles.subtitle}>
          A seamless fusion of luxury and intimacy, this space is thoughtfully crafted to reflect your unique essence — where elegant design meets modern comfort, and every detail evokes a sense of belonging, refinement, and timeless sophistication.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation?.navigate('TabNavigator')} 
        >
          <Text style={styles.buttonText}>Get Started →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#fff',
    },
    image: {
      width,
      flex: 2,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    content: {
      padding: 40,
      flex: 1,
      justifyContent: 'space-between',
      marginBottom: 30,
    },
    title: {
      fontSize: 35,
      color: theme === 'dark' ? '#fff' : '#000',
      fontWeight: 'bold',
    },
    bold: {
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 14,
      color: theme === 'dark' ? '#ccc' : '#555',
      marginTop: 12,
      lineHeight: 20,
    },
    button: {
      backgroundColor: '#FFD000',
      paddingVertical: 16,
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 30,
    },
    buttonText: {
      fontSize: 16,
      color: '#000',
      fontWeight: 'bold',
    },
  });
export default Welcome;