import {AuthScreenProps} from 'navigation/types';
import {
  Button,
  ButtonLink,
  Input,
  PasswordInput,
  ScreenContainer,
  Text,
} from 'components';
import {useForgotPasswordForm} from './form';
import useStore from 'store';

export function ForgotPasswordScreen({
  navigation,
}: AuthScreenProps<'ForgotPassword'>) {
  const {errors, steps, onChangeEmail, onChangePassword, onReset, onForgot} =
    useForgotPasswordForm();

  const isLoading = useStore((s) => s.isLoading);

  const goToSignInScreen = () => {
    navigation.push('SignIn');
  };

  return (
    <ScreenContainer alignItems="center" justifyContent="center">
      <Text
        variant="header"
        content={(steps === 0 && 'Recuperar Senha') || 'Nova Senha'}
      />
      <ButtonLink onPress={goToSignInScreen} cation="Iniciar Sessão" />
      {(steps === 0 && (
        <Input
          label="Email"
          placeholder="ex.: eufrane.neto@exemplo.com"
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={onChangeEmail}
          error={errors.email}
        />
      )) || (
        <PasswordInput
          label="Palavra passe"
          placeholder="Seenha"
          onChangeText={onChangePassword}
          error={errors.password}
        />
      )}
      <Button
        size="l"
        mt="m"
        label={steps === 0 ? 'Enviar' : 'Resetar'}
        onPress={steps === 0 ? onForgot : onReset}
        isLoading={isLoading}
      />
    </ScreenContainer>
  );
}
