import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import RootNavigator from './src/navigation/RootNavigator';

enableScreens();

const App: React.FC = () => (
  <SafeAreaProvider>
    <RootNavigator />
  </SafeAreaProvider>
);

export default App;
