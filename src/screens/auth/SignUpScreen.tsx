import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from 'components/Themed';
import {AuthScreenProps} from 'navigation/types'

export function SignUpScreen({navigation}: AuthScreenProps<'SignUp'>) {
  const goToSignInScreen = () => {
    navigation.push('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up Page</Text>

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
