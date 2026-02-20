import {useRiderStore} from '../../../store/rider.store';
import {useProfileActions} from './useProfileActions.hook';

export const useProfileHook = () => {
  const rider = useRiderStore(s => s.rider);
  const stats = useRiderStore(s => s.stats);
  const actions = useProfileActions();
  return {rider, stats, ...actions};
};
