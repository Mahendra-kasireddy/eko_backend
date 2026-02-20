import React from 'react';
import {useEarningsHook} from './use-earnings-hook';
import EarningsComponent from './Earnings.component';

const EarningsContainer: React.FC = () => {
  const hookData = useEarningsHook();
  return <EarningsComponent {...hookData} />;
};

export default EarningsContainer;
