import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../pages/Dashboard';
import CreateAppointment from '../pages/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated';
import Profile from '../pages/Profile';

export type RootStackParamList = {
  Dashboard: undefined;
  CreateAppointment: {
    providerId: string;
  };
  AppointmentCreated: undefined;
  Profile: undefined;
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
    <Auth.Screen name="CreateAppointment" component={CreateAppointment} />
    <Auth.Screen name="AppointmentCreated" component={AppointmentCreated} />

    <Auth.Screen name="Profile" component={Profile} />
  </Auth.Navigator>
);

export default AuthRoutes;
