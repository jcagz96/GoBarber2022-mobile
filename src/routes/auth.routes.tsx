import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Profile: undefined;
  CreateAppointment: {
    providerId: string;
  };
  AppointmentCreated: {
    date: number;
  };
};

const Auth = createNativeStackNavigator<RootStackParamList>();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    initialRouteName="SignIn"
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
