import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '../../../types/navigation.types';

type HomeNavProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

export const useHomeNavigation = () => {
  const navigation = useNavigation<HomeNavProp>();

  const goToTrips = () => navigation.navigate('Trips');
  const goToTripHistory = () => navigation.navigate('Trips', {tab: 'history'});
  const goToEarnings = () => navigation.navigate('Earnings');
  const goToProfile = () => navigation.navigate('Profile');

  return {goToTrips, goToTripHistory, goToEarnings, goToProfile};
};
