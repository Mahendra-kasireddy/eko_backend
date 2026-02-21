import {useState} from 'react';
import {Alert, ActionSheetIOS, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
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
  const prefillPhone = route.params?.phone ?? '';
  const setRider = useRiderStore(s => s.setRider);

  const [phone, setPhone] = useState(prefillPhone);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>('bike');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [city, setCity] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const pickImage = (source: 'camera' | 'gallery') => {
    const options = {mediaType: 'photo' as const, quality: 0.8 as const, maxWidth: 400, maxHeight: 400};
    const launch = source === 'camera' ? launchCamera : launchImageLibrary;
    launch(options, response => {
      if (response.assets && response.assets[0]?.uri) {
        setProfilePhoto(response.assets[0].uri);
      }
    });
  };

  const showImagePicker = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {options: ['Cancel', 'Take Photo', 'Choose from Gallery'], cancelButtonIndex: 0},
        index => {
          if (index === 1) pickImage('camera');
          if (index === 2) pickImage('gallery');
        },
      );
    } else {
      Alert.alert('Profile Photo', 'Choose a source', [
        {text: 'Camera', onPress: () => pickImage('camera')},
        {text: 'Gallery', onPress: () => pickImage('gallery')},
        {text: 'Cancel', style: 'cancel'},
      ]);
    }
  };

  const phoneReadOnly = prefillPhone.length === 10;

  const isValid =
    phone.trim().length === 10 &&
    name.trim().length >= 2 &&
    vehicleNumber.trim().length >= 4 &&
    city.trim().length >= 2;

  const handleRegister = async () => {
    if (!isValid) return;
    setLoading(true);
    try {
      const res = await registerRider({
        phone: phone.trim(),
        name: name.trim(),
        email: email.trim() || undefined,
        vehicleType,
        vehicleNumber: vehicleNumber.trim().toUpperCase(),
        city: city.trim(),
        profilePhoto,
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
    phone, setPhone, phoneReadOnly,
    name, setName,
    email, setEmail,
    vehicleType, setVehicleType,
    vehicleNumber, setVehicleNumber,
    city, setCity,
    profilePhoto,
    showImagePicker,
    loading,
    isValid,
    handleRegister,
    handleBack,
  };
};
