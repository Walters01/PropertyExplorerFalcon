import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

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
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image source={image} style={styles.image} />
          <TouchableOpacity style={styles.bookmarkIcon} onPress={onToggleBookmark}>
            <Feather
              name={isBookmarked ? 'bookmark' : 'bookmark'}
              size={20}
              color={isBookmarked ? '#333' : '#aaa'}
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 2,
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
    color: '#777',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#111',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },

});

export default PropertyCard;
