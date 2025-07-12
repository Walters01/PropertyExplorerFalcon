import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const PropertyDetail = () => {
  const route = useRoute();
  const { image, title, location, price, description, amenities } = route.params as {
    image: any;
    title: string;
    location: string;
    price: number;
    type: string;
    description: string;
    amenities: string[];
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={image}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.location}>📍 {location}</Text>
          <Text style={styles.rating}>⭐ 4.7 (32 Reviews)</Text>
        </View>

        <Text style={styles.description}>
            {description}
        </Text>

        <Text style={styles.sectionTitle}>What will you get</Text>

        <View style={styles.features}>
            {amenities.map((item, index) => (
                <View key={index} style={styles.featureBox}>
                <Text style={styles.featureText}>{item}</Text>
                </View>
            ))}
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D1C84",
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  location: {
    color: "#777",
  },
  rating: {
    color: "#777",
  },
  description: {
    marginTop: 10,
    color: "#555",
  },
  readMore: {
    color: "#007AFF",
    fontWeight: "600",
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
   
  },
  featureBox: {
    alignItems: "center",
    width: "30%",
    backgroundColor: "#F1F1F1",
    padding: 12,
    borderRadius: 10,
  },
  featureText: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 20,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#FFD700",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    
  },
});

export default PropertyDetail;
