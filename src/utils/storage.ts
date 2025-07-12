import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'FAVORITE_PROPERTIES';

export const saveFavorites = async (favorites: any[]) => {
  try {
    const json = JSON.stringify(favorites);
    await AsyncStorage.setItem(FAVORITES_KEY, json);
  } catch (e) {
    console.error('Saving favorites failed', e);
  }
};

export const loadFavorites = async (): Promise<any[]> => {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Loading favorites failed', e);
    return [];
  }
};
