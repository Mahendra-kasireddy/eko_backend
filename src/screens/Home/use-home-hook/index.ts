import {useHomeData} from './useHomeData.hook';
import {useHomeActions} from './useHomeActions.hook';
import {useHomeNavigation} from './useHomeNavigation.hook';

export const useHomeHook = () => {
  const data = useHomeData();
  const actions = useHomeActions();
  const nav = useHomeNavigation();
  return {...data, ...actions, ...nav};
};
