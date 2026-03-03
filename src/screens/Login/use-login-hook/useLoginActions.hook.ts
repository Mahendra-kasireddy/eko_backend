import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../types/navigation.types';
import {isValidPhone} from '../../../utils/validators';
import {LoginService} from '../login.service';
import {LOGIN_STRINGS} from '../Login.constants';

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const useLoginActions = () => {
  const navigation = useNavigation<LoginNavProp>();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleContinue = async () => {
    if (!isValidPhone(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await LoginService.sendOtp(phone, LOGIN_STRINGS.COUNTRY_CODE);
      navigation.navigate('OTP', {phone});
    } catch {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => navigation.navigate('Signup', {phone: phone || undefined});

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    setPhone(digits);
    if (error) setError('');
  };

  return {
    phone,
    loading,
    error,
    isFocused,
    setIsFocused,
    handleContinue,
    handleSignUp,
    handlePhoneChange,
  };
};
