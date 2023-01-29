import {AuthScreenProps} from 'navigation/types';
import {
  Box,
  Button,
  ButtonLink,
  Input,
  PasswordInput,
  ScreenContainer,
  Text,
} from 'components';
import {useSignUpScreenForm} from './form';

export function SignUpScreen({navigation}: AuthScreenProps<'SignUp'>) {
  const {
    errors,
    isLoading,
    onSubmit,
    onChangeName,
    onChangeEmail,
    onChangePassword,
  } = useSignUpScreenForm();

  const goToSignInScreen = () => {
    navigation.push('SignIn');
  };

  return (
    <ScreenContainer alignItems="center" justifyContent="center">
      <Text variant="header" content="Criar Conta" />
      <Text content="Inicie a sessão para continuares" mt="m" />
      <ButtonLink onPress={goToSignInScreen} cation="Já possuo uma conta" />
      <Input
        label="Nome"
        placeholder="Fulano de Tal"
        onChangeText={onChangeName}
        error={errors.name}
      />
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
      <Button
        size="l"
       mt="m"
        label="Criar Conta"
        onPress={onSubmit}
        isLoading={isLoading}
      />
    </ScreenContainer>
  );
}
