import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import hi from './locales/hi.json';
import te from './locales/te.json';

export type AppLanguage = 'en' | 'hi' | 'te';

export const LANGUAGES: {
  code: AppLanguage;
  name: string;
  nativeName: string;
  flag: string;
}[] = [
  {code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧'},
  {code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳'},
  {code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🏳️'},
];

export const LANGUAGE_STORAGE_KEY = '@ekoridr_language';
export const DEFAULT_LANGUAGE: AppLanguage = 'en';

/** Call once at app startup (before render) */
export const initI18n = async (): Promise<void> => {
  let savedLang: AppLanguage = DEFAULT_LANGUAGE;
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && ['en', 'hi', 'te'].includes(stored)) {
      savedLang = stored as AppLanguage;
    }
  } catch {
    // fallback to default
  }

  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4' as const,
    resources: {
      en: {translation: en},
      hi: {translation: hi},
      te: {translation: te},
    },
    lng: savedLang,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });
};

/** Change language and persist to AsyncStorage */
export const changeLanguage = async (lang: AppLanguage): Promise<void> => {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
};

export {i18n};
export {useTranslation} from 'react-i18next';
