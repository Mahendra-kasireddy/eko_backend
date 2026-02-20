import {useEarningsData} from './useEarningsData.hook';

export const useEarningsHook = () => {
  const data = useEarningsData();
  return {...data};
};
