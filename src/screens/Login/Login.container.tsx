import React from 'react';
import {useLoginHook} from './use-login-hook';
import LoginComponent from './Login.component';

const LoginContainer: React.FC = () => {
  const hookData = useLoginHook();
  return <LoginComponent {...hookData} />;
};

export default LoginContainer;
