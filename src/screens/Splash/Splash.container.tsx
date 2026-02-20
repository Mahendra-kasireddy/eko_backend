import React from 'react';
import {useSplashHook} from './use-splash-hook';
import SplashComponent from './Splash.component';

const SplashContainer: React.FC = () => {
  useSplashHook();
  return <SplashComponent />;
};

export default SplashContainer;
