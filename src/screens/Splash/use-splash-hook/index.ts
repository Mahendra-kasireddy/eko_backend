import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../types/navigation.types';
import {APP} from '../../../constants/app.constants';

type SplashNavProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

export const useSplashHook = () => {
  const navigation = useNavigation<SplashNavProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, APP.SPLASH_DELAY);
    return () => clearTimeout(timer);
  }, [navigation]);
};
