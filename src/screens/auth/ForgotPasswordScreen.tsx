import {AuthScreenProps} from 'navigation/types';
import {Box, Button, ScreenContainer, Text} from 'components';

export function ForgotPasswordScreen({
  navigation,
}: AuthScreenProps<'ForgotPassword'>) {
  const goToSignInScreen = () => {
    navigation.push('SignIn');
  };

  return (
    <ScreenContainer>
      <Text variant="header">Forgot Password Page</Text>

      <Button onPress={goToSignInScreen} label="Go to Sign In Screen" />
    </ScreenContainer>
  );
}
