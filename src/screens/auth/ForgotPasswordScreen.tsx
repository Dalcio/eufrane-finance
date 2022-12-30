import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from 'components/Themed';
import {AuthScreenProps} from 'navigation/types'

export function ForgotPasswordScreen({
  navigation,
}: AuthScreenProps<'ForgotPassword'>) {
  const goToSignInScreen = () => {
    navigation.push('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password Page</Text>
      <Pressable onPress={goToSignInScreen}>
        <Text style={styles.title}>Go to Sign In Screen</Text>
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
