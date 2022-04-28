/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  TextInput,
  Alert,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  BackButton,
  LogoutButton,
} from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { RootStackParamList } from '../../routes/auth.routes';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const { user, updateUser, signOut } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), null],
              'Confirmação de password incorreta',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, old_password, password, password_confirmation } =
          data;

        // if old_password is filled then add to the object, otherwise just send name and email
        const formData = {
          name,
          email,
          ...(data.old_password
            ? {
              old_password,
              password,
              password_confirmation,
            }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data.user);

        Alert.alert(
          'Perfil atualizado com sucesso',
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
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar o seu perfil, tente novamente',
        );
      }
    },
    [navigation, updateUser],
  );

  const handleUpdateAvatar = useCallback(async () => {
    const imageLibraryResponse = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1
    })

    if (imageLibraryResponse.didCancel) {
      return;
    }

    if (imageLibraryResponse.errorCode) {
      Alert.alert("Erro ao atualizar sua foto de perfil");
      return;
    }

    if (imageLibraryResponse.assets && imageLibraryResponse.assets[0]) {
      const formdata = new FormData();
      formdata.append('avatar', {
        uri: Platform.OS === 'android' ? imageLibraryResponse.assets[0].uri : imageLibraryResponse.assets[0].uri?.replace('file://', ''),
        type: imageLibraryResponse.assets[0].type,
        name: imageLibraryResponse.assets[0].fileName
      });

      try {
        const apiResponse = await api.patch("/users/avatar", formdata);
        updateUser(apiResponse.data.user);
      } catch (error) {
        Alert.alert("Erro ao atualizar sua foto de perfil");
      }

    }
    else {
      Alert.alert("Erro ao atualizar sua foto de perfil");
    }


  }, [updateUser]);

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
          <BackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>

          <UserAvatarButton onPress={handleUpdateAvatar}>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </UserAvatarButton>

          <View>
            <Title>Meu Perfil</Title>
          </View>
          <Form
            onSubmit={handleSignUp}
            ref={formRef}
            style={{
              width: '100%',
            }}
            initialData={user}
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
                oldPasswordInputRef.current?.focus();
              }}
            />

            <Input
              secureTextEntry
              ref={oldPasswordInputRef}
              name="old_password"
              icon="lock"
              placeholder="Senha atual"
              textContentType="newPassword"
              returnKeyType="next"
              containerStyle={{ marginTop: 16 }}
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              secureTextEntry
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Nova senha"
              textContentType="newPassword"
              returnKeyType="next"
              onSubmitEditing={() => {
                confirmPasswordInputRef.current?.focus();
              }}
            />

            <Input
              secureTextEntry
              ref={confirmPasswordInputRef}
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmar senha"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Confirmar Mudanças
            </Button>
            <LogoutButton onPress={signOut}>
              <Text>Logout</Text>
            </LogoutButton>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default SignUp;
