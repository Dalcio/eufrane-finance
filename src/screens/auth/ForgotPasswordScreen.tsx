import {AuthScreenProps} from 'navigation/types';
import {Box, Button, Text} from 'components';

export function ForgotPasswordScreen({
  navigation,
}: AuthScreenProps<'ForgotPassword'>) {
  const goToSignInScreen = () => {
    navigation.push('SignIn');
  };

  return (
    <Box>
      <Text variant="header">Forgot Password Page</Text>

      <Button onPress={goToSignInScreen} label="Go to Sign In Screen" />
    </Box>
  );
}
