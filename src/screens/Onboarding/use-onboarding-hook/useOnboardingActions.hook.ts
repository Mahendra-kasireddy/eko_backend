import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../types/navigation.types';
import {ONBOARDING_SLIDES} from '../../../constants/app.constants';

type OnboardingNavProp = NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;

export const useOnboardingActions = () => {
  const navigation = useNavigation<OnboardingNavProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = ONBOARDING_SLIDES.length;
  const isLast = currentIndex === total - 1;

  const goNext = () => {
    if (isLast) {
      navigation.replace('Login');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const skip = () => navigation.replace('Login');

  return {currentIndex, setCurrentIndex, isLast, total, goNext, skip};
};
