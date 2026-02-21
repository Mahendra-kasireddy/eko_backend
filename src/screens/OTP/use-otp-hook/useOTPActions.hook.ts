import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../types/navigation.types';
import {verifyOtp, sendOtp} from '../../../services/auth.service';
import {useRiderStore} from '../../../store/rider.store';
import {APP} from '../../../constants/app.constants';

type OTPNavProp = NativeStackNavigationProp<AuthStackParamList, 'OTP'>;

export const useOTPActions = (
  otp: string[],
  setOtp: (v: string[]) => void,
  phone: string,
  isSignup: boolean,
  setCanResend: (v: boolean) => void,
  setResendTimer: (v: number) => void,
) => {
  const navigation = useNavigation<OTPNavProp>();
  const setRider = useRiderStore(s => s.setRider);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 4) return;
    setLoading(true);
    setError('');
    try {
      const res = await verifyOtp(phone, code);
      if (isSignup || res.isNewUser) {
        navigation.navigate('Signup', {phone});
      } else {
        setRider(res.rider);
        // Navigation handled by RootNavigator via store
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setOtp(['', '', '', '']);
    setError('');
    setCanResend(false);
    setResendTimer(APP.OTP_RESEND_SECONDS);
    await sendOtp(phone);
  };

  const handleBack = () => navigation.goBack();

  const handleOTPInput = (
    value: string,
    index: number,
    setFocusedIndex: (i: number) => void,
  ) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);
    if (digit && index < 3) setFocusedIndex(index + 1);
    if (!digit && index > 0) setFocusedIndex(index - 1);
  };

  return {loading, error, handleVerify, handleResend, handleBack, handleOTPInput};
};
