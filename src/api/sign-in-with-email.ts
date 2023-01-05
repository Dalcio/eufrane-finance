import {signInWithEmailAndPassword} from 'firebase/auth';
import {authHandler} from 'services/firebase.config';

export const signInWithEmailPassword = async (
  email: string,
  password: string,
) =>
  new Promise((resolve, reject) => {
    signInWithEmailAndPassword(authHandler, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        resolve(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;

        reject(errorMessage);
      });
  });
