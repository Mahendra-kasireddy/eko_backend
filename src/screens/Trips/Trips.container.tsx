import React from 'react';
import {useTripsHook} from './use-trips-hook';
import TripsComponent from './Trips.component';

const TripsContainer: React.FC = () => {
  const {tripHistory} = useTripsHook();
  return <TripsComponent tripHistory={tripHistory} />;
};

export default TripsContainer;
