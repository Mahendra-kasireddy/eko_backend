import React from 'react';
import {useOnboardingHook} from './use-onboarding-hook';
import OnboardingComponent from './Onboarding.component';

const OnboardingContainer: React.FC = () => {
  const hookData = useOnboardingHook();
  return <OnboardingComponent {...hookData} />;
};

export default OnboardingContainer;
