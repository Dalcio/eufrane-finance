import {StateCreator} from 'zustand';

export type StoreState = {
  theme: 'dark' | 'light';
};

export type StoreActions = {
  toggleTheme: () => void;
};

export type Store = StoreState & StoreActions;

export type TheStore = StateCreator<StoreState, any, any, StoreActions>;
