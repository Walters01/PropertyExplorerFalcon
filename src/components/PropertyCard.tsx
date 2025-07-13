import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { useTheme } from '../context/ThemeContext'; 

const PropertyCard = ({
  image,
  title,
  location,
  price,
  isBookmarked,
  onToggleBookmark,
  onPress
}: {
  image: any;
  title: string;
  location: string;
  price: string | number;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onPress: () => void;
}) => {
  const { theme } = useTheme(); 
  const styles = getStyles(theme);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image source={image} style={styles.image} />
          <TouchableOpacity style={[styles.bookmarkIcon, isBookmarked && styles.bookmarked]} onPress={onToggleBookmark}>
            <FontAwesome
              name={isBookmarked ? 'bookmark' : 'bookmark-o'} 
              size={20}
              color={isBookmarked ? '#fff' : '#555'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <View style={styles.rowBetween}>
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={14} color="#888" />
              <Text style={styles.location}>{location}</Text>
            </View>
            <Text style={styles.price}>${price}</Text>
          </View>

          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
      borderRadius: 14,
      overflow: 'hidden',
      elevation: 2,
      marginBottom: 16,
    },
    imageWrapper: {
      position: 'relative',
    },
    image: {
      width: '100%',
      height: 160,
    },
    bookmarkIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      borderRadius: 20,
      padding: 6,
      elevation: 2,
    },
    bookmarked: {
      backgroundColor: '#0D1C84',
    },
    details: {
      padding: 12,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    location: {
      marginLeft: 4,
      fontSize: 13,
      color: theme === 'dark' ? '#aaa' : '#777',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 4,
      color: theme === 'dark' ? '#fff' : '#111',
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#FFD700' : '#0D1C84',
    },
  });

export default PropertyCard;
