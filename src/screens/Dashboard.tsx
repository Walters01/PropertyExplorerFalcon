import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, Pressable, TextInput  } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider';
import SearchBar from '../components/SearchBar';
import PropertyTypeSelector from '../components/PropertyTypeSelector';
import PropertyCard from '../components/PropertyCard';
import DefaultModal from '../components/DefaultModal';
import { allProperties } from '../data/properties';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import PropertyDetail from './PropertyDetail';

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
    const filteredProperties = allProperties.filter(
    (prop) => prop.type === selectedType
    );
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20,}}>
                        <Image source={require('../../assets/images/lebron.png')} 
                        style={{ width: 60, height: 60, resizeMode: 'cover', borderRadius: 60,}}/>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.title}>Hello James!</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                                <Feather name="map-pin" size={20} color="#555" />
                                <Text style={{ fontSize: 16, color: '#555', marginLeft: 5 }}>Los Angeles</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingTop: 20,}}>
                        <TouchableOpacity style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 30 }}>
                            <Feather name="bell" size={27} color="#333"  />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    {filteredProperties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            image={property.image}
                            title={property.title}
                            location={property.location}
                            price={property.price}
                            isBookmarked={true}
                            onToggleBookmark={() => console.log('Bookmark')}
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
                        ))}
                </ScrollView>
            </View>
            <DefaultModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Filter by Price Range"
                >
                <Text style={{ fontSize: 16, marginBottom: 8 }}>
                    Selected Range: ${minPrice} - ${maxPrice}
                </Text>

                <Text style={{ fontWeight: 'bold' }}>Min Price</Text>
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={500}
                    maximumValue={1500}
                    step={50}
                    value={Number(minPrice) || 500}
                    onValueChange={(val) => setMinPrice(val.toString())}
                    minimumTrackTintColor="#0D1C84"
                    maximumTrackTintColor="#0D1C84"
                    thumbTintColor="#0D1C84"
                />

                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Max Price</Text>
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={500}
                    maximumValue={1500}
                    step={50}
                    value={Number(maxPrice) || 1500}
                    onValueChange={(val) => setMaxPrice(val.toString())}
                    minimumTrackTintColor="#0D1C84"
                    maximumTrackTintColor="#0D1C84"
                    thumbTintColor="#0D1C84"
                />
            </DefaultModal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 30,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    
});

export default Dashboard;