import {useState, useRef, useEffect} from 'react';
import {APP} from '../../../constants/app.constants';
import {TextInput} from 'react-native';

export const useOTPData = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [resendTimer, setResendTimer] = useState(APP.OTP_RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  return {otp, setOtp, focusedIndex, setFocusedIndex, resendTimer, canResend, setCanResend, setResendTimer, inputRef};
};
