import {useState, useReducer} from 'react';
import {Alert} from 'react-native';
import useStore from 'store';

type SignUpErrors = {
  email?: string;
  password?: string;
  name?: string;
};

export const useSignUpScreenForm = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [isLoading, toggleIsLoading] = useReducer((loading) => !loading, false);

  const signUp = useStore((s) => s.signUp);

  const onChangeName = (str: string) => {
    setName(str);

    if (errors.name) setErrors((ers) => ({...ers, name: ''}));
  };

  const onChangeEmail = (str: string) => {
    setEmail(str);

    if (errors.email) setErrors((ers) => ({...ers, email: ''}));
  };

  const onChangePassword = (str: string) => {
    setPassword(str);

    if (errors.password) setErrors((ers) => ({...ers, password: ''}));
  };

  const onSubmit = () => {
    if (!name || !email || !password) {
      let errs: SignUpErrors = {};

      if (!name) errs = {name: 'Digite um nomeporfavor'};

      if (!email) errs = {...errs, email: 'Digite um email porfavor'};

      if (!password) errs = {...errs, password: 'Digite uma palavra passe'};

      setErrors((ers) => ({...errs}));

      return;
    } else {
      toggleIsLoading();
      signUp({name, email, password}, toggleIsLoading);
    }
  };

  return {
    errors,
    isLoading,
    onSubmit,
    onChangeName,
    onChangeEmail,
    onChangePassword,
  };
};
