import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ReactElement, ReactNode} from 'react';

declare global {
  namespace ReactNavigation {
    // type RootParamList = RootStackParamList;
  }
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthParamList> | undefined;
  Signed: NavigatorScreenParams<SignedParamList> | undefined;
  Modal: (params?: any) => JSX.Element | ReactElement;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type AuthParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type AuthScreenProps<Screen extends keyof AuthParamList> =
  NativeStackScreenProps<AuthParamList, Screen, Screen>;

export type SignedParamList = {
  Home: undefined;
  Revenue: undefined;
  Expenditures: undefined;
  Budget: undefined;
};

export type SignedScreensProps<Screen extends keyof SignedParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<SignedParamList, Screen>,
    NativeStackScreenProps<Omit<RootStackParamList, 'Auth'>>
  >;
