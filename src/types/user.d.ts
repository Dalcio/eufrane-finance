type User = {
  userToken: string;
  name: string;
  email: string;
  birthDate?: Date;
};

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = SignInParams & {
  name: string;
};
