import {useRiderStore} from '../../../store/rider.store';

export const useEkoStatusHook = () => {
  const isOnline = useRiderStore(s => s.isOnline);
  const toggleOnlineStatus = useRiderStore(s => s.toggleOnlineStatus);

  return {isOnline, toggleOnlineStatus};
};
