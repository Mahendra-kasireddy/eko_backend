import React from 'react';
import {useHomeHook} from './use-home-hook';
import HomeComponent from './Home.component';

const HomeContainer: React.FC = () => {
  const hookData = useHomeHook();
  return <HomeComponent {...hookData} />;
};

export default HomeContainer;
