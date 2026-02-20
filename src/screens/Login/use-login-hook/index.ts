import {useLoginActions} from './useLoginActions.hook';

export const useLoginHook = () => {
  const actions = useLoginActions();
  return {...actions};
};
