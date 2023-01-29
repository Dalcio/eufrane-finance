import {useReducer, useState} from 'react';
import useStore from 'store';

type SignInErrors = {
  email?: string;
  password?: string;
};

export const useForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<SignInErrors>({});
  const [steps, setSteps] = useState(0);

  const nextStep = () => {
    setSteps(1);
  };

  const forgoPassword = useStore((s) => s.forgotPassword);
  const resetPassword = useStore((s) => s.resetPassword);

  const onChangeEmail = (str: string) => {
    setEmail(str);

    if (errors.email) setErrors((ers) => ({...ers, email: ''}));
  };

  const onChangePassword = (str: string) => {
    setPassword(str);

    if (errors.password) setErrors((ers) => ({...ers, password: ''}));
  };

  const onForgot = () => {
    if (!email) {
      return setErrors({email: 'Digite um email porfavor'});
    } else {
      forgoPassword(email, nextStep);
    }
  };

  const onReset = () => {
    if (!password) {
      return setErrors({password: 'Digite uma palavra passe'});
    } else {
      resetPassword({email, password});
    }
  };

  return {
    steps,
    errors,
    onReset,
    onForgot,
    onChangeEmail,
    onChangePassword,
  };
};
