import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Dashboard from '../pages/Dashboard';

export type RootStackParamList = {
  Dashboard: undefined;
};

const Auth = createNativeStackNavigator<RootStackParamList>();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Auth.Screen name="Dashboard" component={Dashboard} />
  </Auth.Navigator>
);

export default AuthRoutes;
