import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';


const Profile = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Profile</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        flex: 1,
        padding: 16,
    },
});

export default Profile;