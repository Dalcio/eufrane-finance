import {isLoading} from 'expo-font';
import {useState, useReducer} from 'react';

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
    if (!email || !password || !name) {
      let errs: SignUpErrors;

      if (!name) errs = {...errors, name: 'Digite um nomeporfavor'};

      if (!email) errs = {...errors, email: 'Digite um email porfavor'};

      if (!password) errs = {...errors, password: 'Digite uma palavra passe'};

      setErrors((ers) => ({...ers, ...errs}));

      return;
    }
    toggleIsLoading();
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
