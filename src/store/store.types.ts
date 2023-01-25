import {StateCreator} from 'zustand';

export type StoreState = {
  theme: 'dark' | 'light';
  user: User | undefined;
  expenditures: TExpenditure[];
  dailyExpenditures: TDailyExpenditure[];
  revenues: TRevenue[];
  isLoading: boolean;
  budget: number;
  balance: number;
  ornament: TOrnamentMensal[];
  savings: TSaving[];
};

export type General = {id: string; source: string; value: number};

export type GeneralWithBelongsTo = General & {
  belongsTo: string;
};

export type TRevenue = General & {
  savings?: number;
};

export type TSaving = GeneralWithBelongsTo & {};

export type TDailyExpenditure = GeneralWithBelongsTo & {
  date?: Date;
};

export type TExpenditure = General;

export type TOrnamentMensal = General & {
  daily?: number;
};

type TAddFunc<T = {}> = (props: Omit<T, 'id'>, cb?: Callback) => void;

type RemoveFunc = (props: {id: string}) => void;

export type StoreActions = {
  toggleTheme: () => void;
  signIn: (data: SignInParams, cb?: Callback) => void;
  signUp: (data: SignUpParams, cb?: Callback) => void;
  addRevenue: TAddFunc<TRevenue>;
  addExpenditure: TAddFunc<TExpenditure>;
  addOrnament: TAddFunc<TOrnamentMensal>;
  addDailyExpenditure: TAddFunc<TDailyExpenditure>;
  addSaving: TAddFunc<TSaving>;
  removeSaving: RemoveFunc;
  removeOrnament: RemoveFunc;
  removeDailyExpenditure: RemoveFunc;
  removeRevenue: RemoveFunc;
  removeExpenditure: RemoveFunc;
};

export type Store = StoreState & StoreActions;

export type TheStore = StateCreator<StoreState, any, any, StoreActions>;
