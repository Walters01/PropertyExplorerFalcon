import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider';
import SearchBar from '../components/SearchBar';
import PropertyTypeSelector from '../components/PropertyTypeSelector';
import PropertyCard from '../components/PropertyCard';
import DefaultModal from '../components/DefaultModal';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { allProperties } from '../data/properties';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { loadFavorites } from '../utils/storage';

type RootStackParamList = {
  Dashboard: undefined;
  PropertyDetail: {
    image: any;
    title: string;
    location: string;
    price: number;
    type: string;
    description: string;
    amenities: string[];
  };
};

const Dashboard = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Dashboard'>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Condo');
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [minPrice, setMinPrice] = useState('500');
  const [maxPrice, setMaxPrice] = useState('1500');
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);

  const { theme } = useTheme();
  const styles = getStyles(theme);
  const isDark = theme === 'dark';
  const sliderTrackColor = isDark ? '#90CAF9' : '#0D1C84';
  const sliderThumbColor = isDark ? '#ffffff' : '#0D1C84';

  const applyFilters = () => {
    const query = searchQuery.toLowerCase();

    const filtered = allProperties.filter((prop) => {
      const price = prop.price;
      const matchesPrice =
        price >= Number(minPrice) && price <= Number(maxPrice);
      const matchesSearch =
        prop.title.toLowerCase().includes(query) ||
        prop.location.toLowerCase().includes(query);
      const matchesType = selectedType === 'All' || prop.type === selectedType;

      return matchesPrice && matchesSearch && matchesType;
    });

    setFilteredProperties(filtered);
  };

  const toggleBookmark = async (property: any) => {
    let updatedFavorites;
    const exists = favorites.find((p) => p.id === property.id);

    if (exists) {
      updatedFavorites = favorites.filter((p) => p.id !== property.id);
    } else {
      updatedFavorites = [...favorites, property];
    }

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    applyFilters();
  }, [selectedType]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const saved = await loadFavorites();
      setFavorites(saved);
    };
    fetchFavorites();
  }, []);

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
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.profileRow}>
            <Image
              source={require('../../assets/images/lebron.png')}
              style={styles.avatar}
            />
            <View style={styles.greeting}>
              <Text style={styles.title}>Hello James!</Text>
              <View style={styles.locationRow}>
                <Feather
                  name="map-pin"
                  size={20}
                  color={theme === 'dark' ? '#ccc' : '#555'}
                />
                <Text style={styles.locationText}>Los Angeles</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.bellWrapper,
              {
                backgroundColor:
                  theme === 'dark' ? '#333' : '#f0f0f0',
              },
            ]}
          >
            <Feather
              name="bell"
              size={27}
              color={theme === 'dark' ? '#fff' : '#333'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchRow}>
          <SearchBar
            placeholder="Search properties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => setModalVisible(true)}
          />
        </View>

        <PropertyTypeSelector
          selected={selectedType}
          onSelect={setSelectedType}
          types={['House', 'Apartment', 'Condo']}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredProperties.length === 0 ? (
            <Text style={styles.noResults}>🔎 No results found.</Text>
          ) : (
            filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                image={property.image}
                title={property.title}
                location={property.location}
                price={property.price}
                isBookmarked={favorites.some(
                  (fav) => fav.id === property.id
                )}
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
      </View>

      <DefaultModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Filter by Price Range"
        onApply={() => {
          applyFilters();
          setModalVisible(false);
        }}
      >
        <Text style={[styles.modalText]}>
          Selected Range: ${minPrice} - ${maxPrice}
        </Text>

        <Text style={styles.modalLabel}>Min Price</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={500}
          maximumValue={1500}
          step={50}
          value={Number(minPrice) || 500}
          onValueChange={(val) => setMinPrice(val.toString())}
          minimumTrackTintColor={sliderTrackColor}
          maximumTrackTintColor={sliderTrackColor}
          thumbTintColor={sliderThumbColor}
        />

        <Text style={[styles.modalLabel, { marginTop: 20 }]}>Max Price</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={500}
          maximumValue={1500}
          step={50}
          value={Number(maxPrice) || 1500}
          onValueChange={(val) => setMaxPrice(val.toString())}
          minimumTrackTintColor={sliderTrackColor}
          maximumTrackTintColor={sliderTrackColor}
          thumbTintColor={sliderThumbColor}
        />
      </DefaultModal>
    </SafeAreaView>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#fff',
      padding: 20,
    },
    content: {
      flex: 1,
      paddingTop: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 20,
    },
    avatar: {
      width: 60,
      height: 60,
      resizeMode: 'cover',
      borderRadius: 60,
    },
    greeting: {
      marginLeft: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : '#000',
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      fontSize: 16,
      marginLeft: 5,
      color: theme === 'dark' ? '#ccc' : '#555',
    },
    bellWrapper: {
      marginTop: 10,
      padding: 10,
      borderRadius: 30,
    },
    searchRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    noResults: {
      textAlign: 'center',
      marginTop: 200,
      color: theme === 'dark' ? '#aaa' : '#555',
    },
    modalText: {
      fontSize: 16,
      marginBottom: 8,
      color: theme === 'dark' ? '#fff' : '#000',
    },
    modalLabel: {
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : '#000',
    },
  });

export default Dashboard;
