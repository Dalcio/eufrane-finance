import {TheStore} from './store.types';

const storeActions: TheStore = (set) => ({
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
});

export default storeActions;
