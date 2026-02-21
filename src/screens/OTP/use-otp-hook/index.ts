import {useRoute, RouteProp} from '@react-navigation/native';
import {AuthStackParamList} from '../../../types/navigation.types';
import {useOTPData} from './useOTPData.hook';
import {useOTPActions} from './useOTPActions.hook';

type OTPRouteProp = RouteProp<AuthStackParamList, 'OTP'>;

export const useOTPHook = () => {
  const route = useRoute<OTPRouteProp>();
  const {phone, isSignup = false} = route.params;
  const data = useOTPData();
  const actions = useOTPActions(
    data.otp,
    data.setOtp,
    phone,
    isSignup,
    data.setCanResend,
    data.setResendTimer,
  );
  return {phone, isSignup, ...data, ...actions};
};
