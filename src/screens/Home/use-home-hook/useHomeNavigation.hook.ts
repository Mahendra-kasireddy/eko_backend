import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '../../../types/navigation.types';

type HomeNavProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

export const useHomeNavigation = () => {
  const navigation = useNavigation<HomeNavProp>();

  const goToTrips = () => navigation.navigate('Trips');
  const goToPlastic = () => navigation.navigate('Plastic');
  const goToEarnings = () => navigation.navigate('Earnings');
  const goToProfile = () => navigation.navigate('Profile');

  return {goToTrips, goToPlastic, goToEarnings, goToProfile};
};
