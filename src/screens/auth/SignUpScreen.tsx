import {AuthScreenProps} from 'navigation/types';
import {Box, Button, ScreenContainer, Text} from 'components';

export function SignUpScreen({navigation}: AuthScreenProps<'SignUp'>) {
  const goToSignInScreen = () => {
    navigation.push('SignIn');
  };

  return (
    <ScreenContainer>
      <Text variant="header">Sign Up Page</Text>

      <Button onPress={goToSignInScreen} label="Go to Sign In Screen" />
    </ScreenContainer>
  );
}
