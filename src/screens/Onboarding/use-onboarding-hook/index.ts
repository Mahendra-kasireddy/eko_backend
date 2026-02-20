import {ONBOARDING_SLIDES} from '../../../constants/app.constants';
import {useOnboardingActions} from './useOnboardingActions.hook';

export const useOnboardingHook = () => {
  const actions = useOnboardingActions();
  return {
    slides: ONBOARDING_SLIDES,
    ...actions,
  };
};
