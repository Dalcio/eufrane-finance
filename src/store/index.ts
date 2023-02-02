import {combine, persist} from 'zustand/middleware';
import {StoreState, StoreActions, Store} from './store.types';

import create from 'zustand';
import storeActions from './store.actions';

const storeState: StoreState = {
  theme: 'dark',
  user: undefined,
  expenditures: [],
  revenues: [],
  isLoading: false,
  dailyExpenditures: [],
  balance: 0,
  budget: 0,
  ornament: [],
  savings: [],
};

let store = combine<StoreState, StoreActions, any, any>(
  storeState,
  storeActions,
);

store = persist(store);

const useStore = create<Store>(store);

export default useStore;
