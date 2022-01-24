import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './routes';
import { Container, Title } from './pages/SignIn/styles';
import AppProvider from './hooks';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <AppProvider>
      <AuthRoutes />
    </AppProvider>
  </NavigationContainer>
);

export default App;
