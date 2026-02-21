import {useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../types/navigation.types';
import {VehicleType} from '../../../types/rider.types';
import {registerRider} from '../../../services/auth.service';
import {useRiderStore} from '../../../store/rider.store';

type SignupNavProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;
type SignupRouteProp = RouteProp<AuthStackParamList, 'Signup'>;

export const useSignupHook = () => {
  const navigation = useNavigation<SignupNavProp>();
  const route = useRoute<SignupRouteProp>();
  const {phone} = route.params;
  const setRider = useRiderStore(s => s.setRider);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>('bike');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid =
    name.trim().length >= 2 &&
    vehicleNumber.trim().length >= 4 &&
    city.trim().length >= 2;

  const handleRegister = async () => {
    if (!isValid) return;
    setLoading(true);
    try {
      const res = await registerRider({
        phone,
        name: name.trim(),
        email: email.trim() || undefined,
        vehicleType,
        vehicleNumber: vehicleNumber.trim().toUpperCase(),
        city: city.trim(),
      });
      setRider(res.rider);
      // RootNavigator detects isAuthenticated → switches to Main
    } catch {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigation.goBack();

  return {
    phone,
    name, setName,
    email, setEmail,
    vehicleType, setVehicleType,
    vehicleNumber, setVehicleNumber,
    city, setCity,
    loading,
    isValid,
    handleRegister,
    handleBack,
  };
};
