import {Alert} from 'react-native';
import {UserCredential, createUserWithEmailAndPassword} from 'firebase/auth';
import {authHandler} from 'services/firebase.config';

export const signUpWithEmailPassword = async (
  email: string,
  password: string,
) =>
  new Promise<UserCredential['user']>((resolve, reject) => {
    createUserWithEmailAndPassword(authHandler, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        resolve(user);
      })
      .catch((error) => {
        const errorMessage = error.message;

        Alert.alert(error);
        reject(errorMessage);
      });
  });
