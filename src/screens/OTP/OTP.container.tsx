import React from 'react';
import {useOTPHook} from './use-otp-hook';
import OTPComponent from './OTP.component';

const OTPContainer: React.FC = () => {
  const hookData = useOTPHook();
  return <OTPComponent {...hookData} />;
};

export default OTPContainer;
