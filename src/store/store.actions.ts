import {TheStore} from './store.types';

const storeActions: TheStore = (set) => ({
  toggleTheme: () => {
    set((state) => ({theme: state.theme === 'dark' ? 'light' : 'dark'}));
  },
});

export default storeActions;
