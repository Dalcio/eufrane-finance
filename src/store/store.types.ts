import {StateCreator} from 'zustand';

export type StoreState = {
  theme: 'dark' | 'light';
  user: User | undefined;
};

export type StoreActions = {
  toggleTheme: () => void;
};

export type Store = StoreState & StoreActions;

export type TheStore = StateCreator<StoreState, any, any, StoreActions>;
