import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    enabled
  >
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Image source={logoImg} />
        <View>
          <Title>Faça o seu Login</Title>
        </View>

        <Input name="email" icon="mail" placeholder="E-mail" />
        <Input name="password" icon="lock" placeholder="Senha" />
        <Button
          onPress={() => {
            console.log('deu');
          }}
        >
          Entrar
        </Button>

        <ForgotPassword
          onPress={() => {
            console.log('teste forgotPassword');
          }}
        >
          <ForgotPasswordText>Esqueci a minha senha</ForgotPasswordText>
        </ForgotPassword>

        <CreateAccountButton
          onPress={() => {
            console.log('teste createAccountButton');
          }}
        >
          <Icon name="log-in" size={20} color="#ff9000" />
          <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
        </CreateAccountButton>
      </Container>
    </ScrollView>
  </KeyboardAvoidingView>
);

export default SignIn;
