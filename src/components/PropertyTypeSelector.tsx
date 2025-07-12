import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const types = [
  { label: 'House', icon: '🏠' },
  { label: 'Apartment', icon: '🏢' },
  { label: 'Condo', icon: '🏬' },
];

const PropertyTypeSelector = ({
  selected,
  onSelect,
  types = ['House', 'Apartment', 'Condo'], // default
}: {
  selected: string;
  onSelect: (type: string) => void;
  types?: string[]; // optional list
}) => {
  const icons: Record<string, string> = {
    House: '🏠',
    Apartment: '🏢',
    Condo: '🏙️',
  };

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

const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
   
  },
  activeButton: {
    backgroundColor: '#fff',
    elevation: 5,
    shadowOpacity: 0.2,
    opacity: 1,
   
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 14,
    marginTop: 4,
    color: '#888',
    
  },
  activeText: {
    color: '#000',
    fontWeight: 'bold',
    
  },
});

export default PropertyTypeSelector;
