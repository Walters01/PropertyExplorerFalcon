import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext'; 

type RootStackParamList = {
  Welcome: undefined;
};

const Profile = () => {
  const { theme, toggleTheme } = useTheme(); 
  const isDark = theme === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#fff' },
      ]}
    >
      <View style={styles.profileInfo}>
        <Image
          source={require('../../assets/images/lebron.png')}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: isDark ? '#fff' : '#000' }]}>
          James Lebron
        </Text>
        <Text style={[styles.email, { color: isDark ? '#bbb' : '#777' }]}>
          lebron.james@email.com
        </Text>
      </View>

      <View style={styles.section}>
        {/* Theme Toggle */}
        <View style={styles.row}>
          <Feather name="sun" size={20} color={isDark ? '#fff' : '#333'} />
          <Text style={[styles.rowText, { color: isDark ? '#fff' : '#000' }]}>
            Dark Mode
          </Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Switch
              value={isDark}
              onValueChange={toggleTheme} 
              trackColor={{ false: '#ccc', true: '#0D1C84' }}
              thumbColor={isDark ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.row}>
          <Feather name="settings" size={20} color={isDark ? '#fff' : '#333'} />
          <Text style={[styles.rowText, { color: isDark ? '#fff' : '#000' }]}>
            Account Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          }}
        >
          <Feather
            name="log-out"
            size={20}
            color={isDark ? '#FFD700' : '#0D1C84'}
          />
          <Text
            style={[
              styles.rowText,
              { color: isDark ? '#FFD700' : '#0D1C84' },
            ]}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
  },
  section: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  rowText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    fontWeight: 'bold',
  },
});
