import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { RootStackParamList } from '../../routes/auth.routes';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        console.log(' entrou no try  ');

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(' entrou no try , antes do teste ');
        const teste = await api.post('/users', data);

        console.log(`--> ${JSON.stringify(data)}`);

        Alert.alert(
          'Registo realizado com sucesso',
          'Você já pode fazer login na aplicação',
        );

        navigation.goBack();
      } catch (error: unknown) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }
        // disparar um toast
        Alert.alert(
          'Erro no Registo',
          'Ocorreu um erro ao fazer o registo, tente novamente',
        );
      }
    },
    [navigation],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Crie a sua Conta</Title>
          </View>
          <Form
            onSubmit={handleSignUp}
            ref={formRef}
            style={{
              width: '100%',
            }}
          >
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              keyboardType="email-address"
              ref={emailInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              secureTextEntry
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button
              onPress={() => {
                console.log('botão de submit foi pressionado');
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>
          </Form>

          <BackToSignIn
            onPress={() => {
              // navigation.navigate('SignIn');
              navigation.goBack();
            }}
          >
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>Voltar para logon</BackToSignInText>
          </BackToSignIn>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default SignUp;
