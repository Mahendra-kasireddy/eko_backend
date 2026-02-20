import {usePlasticData} from './usePlasticData.hook';

export const usePlasticHook = () => {
  const data = usePlasticData();
  return {...data};
};
