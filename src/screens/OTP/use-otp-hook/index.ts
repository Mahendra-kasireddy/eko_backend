import {useRoute, RouteProp} from '@react-navigation/native';
import {AuthStackParamList} from '../../../types/navigation.types';
import {useOTPData} from './useOTPData.hook';
import {useOTPActions} from './useOTPActions.hook';

type OTPRouteProp = RouteProp<AuthStackParamList, 'OTP'>;

export const useOTPHook = () => {
  const route = useRoute<OTPRouteProp>();
  const {phone} = route.params;
  const data = useOTPData();
  const actions = useOTPActions(
    data.otp,
    data.setOtp,
    phone,
    data.setCanResend,
    data.setResendTimer,
  );
  return {phone, ...data, ...actions};
};
