import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropertyCard from '../components/PropertyCard';
import { useTheme } from '../context/ThemeContext'; 
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


type RootStackParamList = {
  PropertyDetail: {
    image: any;
    title: any;
    location: any;
    price: any;
    type: any;
    description: any;
    amenities: any;
  };

};

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const styles = getStyles(theme); 
  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    setFavorites(stored ? JSON.parse(stored) : []);
  };

  const toggleBookmark = async (property: any) => {
    const updated = favorites.filter((p) => p.id !== property.id);
    setFavorites(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
        const fetchFavorites = async () => {
        const stored = await AsyncStorage.getItem('favorites');
        setFavorites(stored ? JSON.parse(stored) : []);
        };
        fetchFavorites();
    }, [])
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {favorites.length === 0 ? (
            <Text style={styles.emptyText}>No favorites yet</Text>
        ) : (
        favorites.map((property) => (
            <PropertyCard
                key={property.id}
                image={property.image}
                title={property.title}
                location={property.location}
                price={property.price}
                isBookmarked={true}
                onToggleBookmark={() => toggleBookmark(property)}
                onPress={() =>
                navigation.navigate('PropertyDetail', {
                    image: property.image,
                    title: property.title,
                    location: property.location,
                    price: property.price,
                    type: property.type,
                    description: property.description,
                    amenities: property.amenities,
                })
                }
        />
    ))
  )}
</ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme === 'dark' ? '#121212' : '#fff',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 250,
      fontSize: 16,
      color: theme === 'dark' ? '#aaa' : '#888',
    },
  });

export default Favorites;
