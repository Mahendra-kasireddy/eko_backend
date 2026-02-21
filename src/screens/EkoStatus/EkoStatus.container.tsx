import React from 'react';
import {useEkoStatusHook} from './use-eko-status-hook';
import EkoStatusComponent from './EkoStatus.component';

const EkoStatusContainer: React.FC = () => {
  const hookData = useEkoStatusHook();
  return <EkoStatusComponent {...hookData} />;
};

export default EkoStatusContainer;
