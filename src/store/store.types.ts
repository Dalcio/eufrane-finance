import {StateCreator} from 'zustand';

export type StoreState = {
  theme: 'dark' | 'light';
  user: User | undefined;
  expenditures: Expenditure[] | undefined;
  revenues: Revenue[] | undefined;
};

export type Revenue = {
  date: Date;
  source: string;
  value: number;
};

export type Expenditure = Revenue;

export type DailyExpenditure = Expenditure & {};

export type StoreActions = {
  toggleTheme: () => void;
  signIn: (data: SignInParams, cb?: Callback) => void;
  signUp: (data: SignUpParams, cb?: Callback) => void;
  addRevenue: (props: Revenue) => void;
  addExpenditure: (props: Expenditure) => void;
  // addDailyExpenditure: (props: DailyExpenditure) => void;
};

export type Store = StoreState & StoreActions;

export type TheStore = StateCreator<StoreState, any, any, StoreActions>;
