import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes/index';
import AppProvider from './hooks';
import RemotePushController from './services/RemotePushController';

const App: React.FC = () => (
  <NavigationContainer>
    <RemotePushController />
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <AppProvider>
      <Routes />
    </AppProvider>
  </NavigationContainer>
);

export default App;
