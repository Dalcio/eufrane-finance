import {StateCreator} from 'zustand';

export type StoreState = {
  theme: 'dark' | 'light';
  user: User | undefined;
  expenditures: TExpenditure[] | undefined;
  dailyExpenditures: TDailyExpenditure[] | undefined;
  revenues: TRevenue[] | undefined;
  isLoading: boolean;
  budget: number;
  balance: number;
};

export type TRevenue = {
  id: string;
  source: string;
  value: number;
};

export type TDailyExpenditure = {
  id: string;
  date?: Date;
  source: string;
  value: number;
};

export type TExpenditure = TRevenue;

type TAddFunc<T = {}> = (props: Omit<T, 'id'>, cb?: Callback) => void;

export type StoreActions = {
  toggleTheme: () => void;
  signIn: (data: SignInParams, cb?: Callback) => void;
  signUp: (data: SignUpParams, cb?: Callback) => void;
  addRevenue: TAddFunc<TRevenue>;
  addExpenditure: TAddFunc<TExpenditure>;
  addDailyExpenditure: TAddFunc<TDailyExpenditure>;
};

export type Store = StoreState & StoreActions;

export type TheStore = StateCreator<StoreState, any, any, StoreActions>;
