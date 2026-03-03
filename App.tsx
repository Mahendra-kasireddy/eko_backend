import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import RootNavigator from './src/navigation/RootNavigator';
import {initI18n} from './src/i18n';
import {TokenStorage} from './src/services/token.storage';
import {RiderStorage} from './src/services/rider.storage';
import {useRiderStore} from './src/store/rider.store';

enableScreens();

const App: React.FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initI18n();
      const token = await TokenStorage.getToken();
      if (token) {
        const rider = await RiderStorage.getRider();
        if (rider) useRiderStore.getState().setRider(rider);
      }
      setReady(true);
    };
    init();
  }, []);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
