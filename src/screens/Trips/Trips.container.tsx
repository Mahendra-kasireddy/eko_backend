import React from 'react';
import {useTripsHook} from './use-trips-hook';
import TripsComponent from './Trips.component';

const TripsContainer: React.FC = () => {
  const hookData = useTripsHook();
  return <TripsComponent {...hookData} />;
};

export default TripsContainer;
