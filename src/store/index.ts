import {combine, devtools, persist} from 'zustand/middleware';
import {StoreState, TheStore, StoreActions, Store} from './store.types';

import create from 'zustand';
import storeActions from './store.actions';

const storeState: StoreState = {
  theme: 'dark',
};

let store = combine<StoreState, StoreActions, any, any>(
  storeState,
  storeActions,
);

store = persist(store);
store = devtools(store);

const useStore = create<Store>(store);

export default useStore;
