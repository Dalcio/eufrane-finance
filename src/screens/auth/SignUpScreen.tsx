import {AuthScreenProps} from 'navigation/types';
import {Box, Button, Text} from 'components';

export function SignUpScreen({navigation}: AuthScreenProps<'SignUp'>) {
  const goToSignInScreen = () => {
    navigation.push('SignIn');
  };

  return (
    <Box>
      <Text variant="header">Sign Up Page</Text>

      <Button onPress={goToSignInScreen} label="Go to Sign In Screen" />
    </Box>
  );
}
