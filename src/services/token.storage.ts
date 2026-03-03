import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@eko_rider_auth_token';

export const TokenStorage = {
  setToken: (token: string) => AsyncStorage.setItem(TOKEN_KEY, token),
  getToken: () => AsyncStorage.getItem(TOKEN_KEY),
  removeToken: () => AsyncStorage.removeItem(TOKEN_KEY),
};
