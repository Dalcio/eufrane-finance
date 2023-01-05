import {TheStore} from './store.types';
import {v4 as uuid} from 'uuid';

const storeActions: TheStore = (set, get) => ({
  toggleTheme: () => {
    set((state) => ({theme: state.theme === 'dark' ? 'light' : 'dark'}));
  },
  signIn(data, cb) {
    setTimeout(() => {
      set((state) => ({
        user: {
          email: data.email,
          name: data.email,
          userToken: new Date().toLocaleTimeString(),
        },
      }));
      cb?.();
    }, 2 * 60);
  },
  signUp(data, cb) {
    setTimeout(() => {
      set((state) => ({
        user: {
          email: data.email,
          name: data.name,
          userToken: new Date().toLocaleTimeString(),
        },
      }));
      cb?.();
    }, 2 * 60);
  },
  addExpenditure(props, cb) {
    set({isLoading: true});

    const expenditures = get().expenditures ?? [];

    set(() => ({
      expenditures: [...expenditures, {...props, id: uuid()}],
    }));

    setTimeout(() => {
      set({isLoading: false});
      cb?.();
    }, 2 * 60);
  },
  addRevenue(props, cb) {
    set({isLoading: true});

    const revenues = get().revenues ?? [];

    set(() => ({
      revenues: [...revenues, {...props, id: uuid()}],
    }));

    setTimeout(() => {
      set({isLoading: false});
      cb?.();
    }, 2 * 60);
  },
  addDailyExpenditure(props, cb) {
    set({isLoading: true});

    const dailyExpenditures = get().dailyExpenditures ?? [];

    set(() => ({
      dailyExpenditures: [...dailyExpenditures, {...props, id: uuid()}],
    }));

    setTimeout(() => {
      set({isLoading: false});
      cb?.();
    }, 2 * 60);
  },
});

export default storeActions;
