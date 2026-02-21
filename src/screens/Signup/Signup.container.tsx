import React from 'react';
import {useSignupHook} from './use-signup-hook';
import SignupComponent from './Signup.component';

const SignupContainer: React.FC = () => {
  const hookData = useSignupHook();
  return <SignupComponent {...hookData} />;
};

export default SignupContainer;
