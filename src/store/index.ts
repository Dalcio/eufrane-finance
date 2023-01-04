import {combine} from 'zustand/middleware';
import {StoreState, StoreActions, Store} from './store.types';

import create from 'zustand';
import storeActions from './store.actions';

const storeState: StoreState = {
  theme: 'dark',
  user: undefined,
  expenditures: undefined,
  revenues: undefined,
};

let store = combine<StoreState, StoreActions, any, any>(
  storeState,
  storeActions,
);

const useStore = create<Store>(store);

export default useStore;
