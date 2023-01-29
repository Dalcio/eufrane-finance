import {AuthScreenProps} from 'navigation/types';
import {
  Button,
  Box,
  Text,
  ScreenContainer,
  Input,
  PasswordInput,
  ButtonLink,
} from 'components';
import {useSignInScreenForm} from './form';

export function SignInScreen({navigation}: AuthScreenProps<'SignIn'>) {
  const {errors, isLoading, onSubmit, onChangeEmail, onChangePassword} =
    useSignInScreenForm();

  const goToSignUpScreen = () => {
    navigation.push('SignUp');
  };

  const goToForgotPasswordScreen = () => {
    navigation.push('ForgotPassword');
  };

  return (
    <ScreenContainer alignItems="center" justifyContent="center">
      <Text variant="header" content="Entrar" />
      <Text content="Inicie a sessão para continuares" mt="m" />
      <Input
        label="Email"
        placeholder="ex.: eufrane.neto@exemplo.com"
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={onChangeEmail}
        error={errors.email}
      />
      <PasswordInput
        label="Palavra passe"
        placeholder="Seenha"
        onChangeText={onChangePassword}
        error={errors.password}
      />
      <Box alignSelf="flex-start" mb="m">
        <ButtonLink
          onPress={goToForgotPasswordScreen}
          cation="Esqueceu a senha?"
        />
      </Box>
      <Button
        size="l"
        label="Entrar"
        onPress={onSubmit}
        isLoading={isLoading}
      />
      <ButtonLink onPress={goToSignUpScreen} cation="Criar conta" />
    </ScreenContainer>
  );
}
