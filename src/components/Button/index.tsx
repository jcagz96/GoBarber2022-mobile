/* eslint-disable prettier/prettier */
import React from 'react';
import {
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
} from 'react-native';

import { Container, ButtonText } from './styles';

interface ButtonProps
  extends Pick<
  TouchableNativeFeedbackProps & TouchableOpacityProps,
  | 'onPress'
  > {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
