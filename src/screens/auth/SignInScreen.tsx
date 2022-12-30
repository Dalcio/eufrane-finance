import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from 'components/Themed';
import {AuthScreenProps} from 'navigation/types'

export function SignInScreen({navigation}: AuthScreenProps<'SignIn'>) {
  const goToSignUpScreen = () => {
    navigation.push('SignUp');
  };

  const goToForgotPasswordScreen = () => {
    navigation.push('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In Page</Text>

      <Pressable onPress={goToSignUpScreen}>
        <Text style={styles.title}>Go to Sign In Screen</Text>
      </Pressable>

      <Pressable onPress={goToForgotPasswordScreen}>
        <Text style={styles.title}>Go to Forgot Password Screen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
