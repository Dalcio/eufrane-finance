import {Pressable} from 'react-native';
import {AuthScreenProps} from 'navigation/types';
import {Button, Box, Text} from 'components';

export function SignInScreen({navigation}: AuthScreenProps<'SignIn'>) {
  const goToSignUpScreen = () => {
    navigation.push('SignUp');
  };

  const goToForgotPasswordScreen = () => {
    navigation.push('ForgotPassword');
  };

  return (
    <Box alignItems="center">
      <Text variant="header">Sign In Page</Text>

      <Pressable onPress={goToSignUpScreen}>
        <Text variant="subheader">Go to Sign In Screen</Text>
      </Pressable>

      <Pressable onPress={goToForgotPasswordScreen}>
        <Text>Go to Forgot Password Screen</Text>
      </Pressable>

      <Button label="Entrar" onPress={() => {}} />
    </Box>
  );
}
