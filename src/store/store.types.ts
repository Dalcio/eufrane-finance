import {StateCreator} from 'zustand';

export type StoreState = {
  theme: 'dark' | 'light';
  user: User | undefined;
};

export type StoreActions = {
  toggleTheme: () => void;
  signIn: (data: SignInParams, cb?: Callback) => void;
  signUp: (data: SignUpParams, cb?: Callback) => void;
};

export type Store = StoreState & StoreActions;

export type TheStore = StateCreator<StoreState, any, any, StoreActions>;
