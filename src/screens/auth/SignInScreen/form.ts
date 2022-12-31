import {useReducer, useState} from 'react';
import useStore from 'store';

type SignInErrors = {
  email?: string;
  password?: string;
};

export const useSignInScreenForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<SignInErrors>({});
  const [isLoading, toggleIsLoading] = useReducer((loading) => !loading, false);

  const signIn = useStore((s) => s.signIn);

  const onChangeEmail = (str: string) => {
    setEmail(str);

    if (errors.email) setErrors((ers) => ({...ers, email: ''}));
  };

  const onChangePassword = (str: string) => {
    setPassword(str);

    if (errors.password) setErrors((ers) => ({...ers, password: ''}));
  };

  const onSubmit = () => {
    if (!email || !password) {
      let errs: SignInErrors = {};

      if (!email) errs = {email: 'Digite um email porfavor'};

      if (!password) errs = {...errs, password: 'Digite uma palavra passe'};

      setErrors({...errs});

      return;
    } else {
      toggleIsLoading();
      signIn({email, password}, toggleIsLoading);
    }
  };

  return {
    errors,
    isLoading,
    onSubmit,
    onChangeEmail,
    onChangePassword,
  };
};
