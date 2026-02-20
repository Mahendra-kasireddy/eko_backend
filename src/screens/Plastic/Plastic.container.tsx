import React from 'react';
import {usePlasticHook} from './use-plastic-hook';
import PlasticComponent from './Plastic.component';

const PlasticContainer: React.FC = () => {
  const hookData = usePlasticHook();
  return <PlasticComponent {...hookData} />;
};

export default PlasticContainer;
