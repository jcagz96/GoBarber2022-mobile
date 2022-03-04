import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Container } from './styles';

const AppointmentCreated: React.FC = () => {
  const route = useRoute();

  console.log(JSON.stringify(route.params));

  return <Container />;
};
export default AppointmentCreated;
