import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const types = [
  { label: 'House', icon: '🏠' },
  { label: 'Apartment', icon: '🏢' },
  { label: 'Condo', icon: '🏬' },
];

const PropertyTypeSelector = ({
  selected,
  onSelect,
  types = ['House', 'Apartment', 'Condo'], 
}: {
  selected: string;
  onSelect: (type: string) => void;
  types?: string[]; 
}) => {
  const icons: Record<string, string> = {
    House: '🏠',
    Apartment: '🏢',
    Condo: '🏙️',
  };
  const { theme } = useTheme();
  const styles = getStyles(theme);
   return (
    <View style={styles.container}>
      {types.map((label) => {
        const isActive = selected === label;
        return (
          <TouchableOpacity
            key={label}
            onPress={() => onSelect(label)}
            style={[styles.button, isActive && styles.activeButton]}
          >
            
            <Text style={[styles.icon, isActive && styles.activeText]}>{icons[label]}</Text>
            <Text style={[styles.label, isActive && styles.activeText]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 16,
    },
    button: {
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
      flexDirection: 'row',
      backgroundColor: theme === 'dark' ? '#222' : '#fff',
      opacity: 0.9,
    },
    activeButton: {
      backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
      elevation: 4,
      shadowOpacity: 0.2,
      opacity: 1,
    },
    icon: {
      fontSize: 20,
      marginRight: 6,
      color: theme === 'dark' ? '#aaa' : '#555',
    },
    label: {
      fontSize: 14,
      color: theme === 'dark' ? '#aaa' : '#888',
    },
    activeText: {
      color: theme === 'dark' ? '#fff' : '#000',
      fontWeight: 'bold',
    },
  });

export default PropertyTypeSelector;
