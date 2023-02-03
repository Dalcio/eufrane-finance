import {Alert} from 'react-native';
import {TheStore} from './store.types';
import {v4 as uuid} from 'uuid';
import {authHandler, db} from 'services/firebase.config';
import {signInWithEmailPassword} from 'api/sign-in-with-email';
import {signUpWithEmailPassword} from 'api/sign-up-with-email';
import {addDoc, collection, deleteDoc, doc, setDoc} from 'firebase/firestore';

const storeActions: TheStore = (set, get) => ({
  toggleTheme: () => {
    set((state) => ({theme: state.theme === 'dark' ? 'light' : 'dark'}));
  },
  async signIn({email, password}) {
    set({isLoading: true});
    try {
      const {displayName} = await signInWithEmailPassword(email, password);
      const userToken = await authHandler?.currentUser?.getIdToken();

      set(() => ({
        isLoading: false,
        user: {
          email,
          name: displayName ?? '',
          userToken: userToken ?? '',
        },
      }));
    } catch (error: any) {}
    set({isLoading: false});
  },
  async signUp({email, password}) {
    set({isLoading: true});
    try {
      const {displayName} = await signUpWithEmailPassword(email, password);

      const userToken = await authHandler?.currentUser?.getIdToken();

      set(() => ({
        isLoading: false,
        user: {
          email,
          name: displayName ?? '',
          userToken: userToken ?? '',
        },
      }));
    } catch (error: any) {}
    set({isLoading: false});
  },
  forgotPassword(email, cb) {
    set({isLoading: true});
    cb();
    set({isLoading: false});
  },
  resetPassword(params) {},
  async addExpenditure(props, cb) {
    set({isLoading: true});
    const expenditures = get().expenditures;
    const userId = get().user?.email ?? '';
    const docRef = await addDoc(
      collection(db, 'data', userId, 'expenditures'),
      props,
    );

    set((draft) => ({
      expenditures: [...expenditures, {...props, daily: props.value, id: uId}],
      budget: draft.budget - props.value,
    }));
    cb?.();
    set({isLoading: false});
  },
  async addRevenue(props, cb) {
    set({isLoading: true});
    const revenues = get().revenues;
    const userId = get().user?.email ?? '';

    try {
      const uId = uuid();
      await setDoc(doc(db, 'data', userId, 'revenues', uId), {
        ...props,
        savings: props.value,
      });
      const budget = get().budget;
      await setDoc(doc(db, 'data', userId, 'budget', 'value'), {
        value: budget + props.value,
      });

      set((draft) => ({
        revenues: [...revenues, {...props, savings: props.value, id: uId}],
        budget: draft.budget + props.value,
        isLoading: false,
      }));
      cb?.();
    } catch (error) {}
    set({isLoading: false});
  },
  async addDailyExpenditure(props, cb) {
    set({isLoading: true});
    let ornament = get().ornament;
    const userId = get().user?.email ?? '';
    const draftIdx = ornament?.findIndex((e) => e.id === props.belongsTo);
    const value = ornament[draftIdx]?.daily ?? 0;
    try {
      if (value - props.value >= 0) {
        await addDoc(
          collection(db, 'data', userId, 'dailyExpenditures'),
          props,
        );
        ornament[draftIdx].daily = value - props.value;

        const uId = uuid();
        await setDoc(doc(db, 'data', userId, 'ornaments'), ornament);

        set((draft) => ({
          dailyExpenditures: [...draft.dailyExpenditures, {...props, id: uId}],
          ornament,
          isLoading: false,
        }));
        cb?.();
      } else {
        Alert.alert(
          'Não é possivel adicionares mais neste gasto. Limite ultrapassado',
        );
      }
    } catch (error) {}
    set({isLoading: false});
  },
  async addOrnament(data, cb) {
    set({isLoading: true});
    const ornament = get().ornament;
    const userId = get().user?.email ?? '';

    try {
      const uId = uuid();

      await setDoc(doc(db, 'data', userId, 'ornaments'), data);

      const budget = get().budget;
      await setDoc(doc(db, 'data', userId, 'budget', 'value'), {
        budget: budget - data.value,
      });

      set((d) => ({
        isLoading: false,
        budget: d.budget - data.value,
        ornament: [...ornament, {...data, daily: data.value, id: uId}],
      }));
      cb?.();
    } catch (error) {}
    set({isLoading: false});
  },
  async addSaving(props, cb) {
    set({isLoading: true});
    let revenues = get().revenues;
    const draftIdx = revenues?.findIndex((e) => e.id === props.belongsTo);
    const value = revenues[draftIdx]?.savings ?? 0;

    try {
      if (value - props.value >= 0) {
        const userId = get().user?.email ?? '';

        const uId = uuid();
        await setDoc(doc(db, 'data', userId, 'savings', uId), props);
        revenues[draftIdx].savings = value - props.value;

        await setDoc(
          doc(db, 'data', userId, 'revenues', revenues[draftIdx].id),
          revenues[draftIdx],
        );
        const budget = get().budget;
        await setDoc(doc(db, 'data', userId, 'budget', 'value'), {
          budget: budget - props.value,
        });

        set((d) => ({
          isLoading: false,
          savings: [...d.savings, {...props, id: uId}],
          revenues: [...revenues],
          budget: d.budget - props.value,
        }));

        cb?.();
      } else {
        Alert.alert('Não é possivel adicionares mais poupanças nesta receita.');
      }
    } catch (error) {}
    set({isLoading: false});
  },
  async removeDailyExpenditure(props) {
    const dailyExpenditures = get().dailyExpenditures;
    const idx = dailyExpenditures.findIndex((o) => o.id === props.id);
    const [removed] = dailyExpenditures.splice(idx, 1);
    const ornament = get().ornament.map((exp) => {
      if (exp.id === removed.belongsTo) {
        (async () => {
          await setDoc(doc(db, 'data', userId, 'ornaments', exp.id), {
            ...exp,
            daily: (exp.daily ?? 0) + removed.value,
          });
        })();

        return {...exp, daily: (exp.daily ?? 0) + removed.value};
      }

      return exp;
    });
    const userId = get().user?.email ?? '';
    await deleteDoc(doc(db, 'data', userId, 'dailyExpenditures', props.id));

    set({dailyExpenditures, ornament});
  },
  async removeSaving(props) {
    const savings = get().savings;
    const email = get().user?.email ?? '';
    const idx = savings.findIndex((o) => o.id === props.id);
    const [removed] = savings.splice(idx, 1);
    const revenueIdx = get().revenues.findIndex(
      (rev) => rev.id === removed.belongsTo,
    );
    const revenues = get().revenues;
    revenues[revenueIdx].savings =
      (revenues[revenueIdx].savings ?? 0) + removed.value;

    await setDoc(doc(db, 'data', email, 'revenues', revenues[revenueIdx].id), {
      ...revenues,
      savings: (revenues[revenueIdx].savings ?? 0) + removed.value,
    });
    const budget = get().budget;
    await setDoc(doc(db, 'data', email, 'budget', 'value'), {
      value: budget + removed.value,
    });

    await deleteDoc(doc(db, 'data', email, 'savings', props.id));

    set((d) => ({savings, revenues, budget: d.budget + removed.value}));
  },
  async removeRevenue(props) {
    const revenue = get().revenues;
    const idx = revenue.findIndex((o) => o.id === props.id);
    const [removed] = revenue.splice(idx, 1);

    const savings = get().savings.filter(
      ({belongsTo}) => belongsTo !== props.id,
    );
    const savingsToDelete = get().savings.filter(
      ({belongsTo}) => belongsTo === props.id,
    );

    savingsToDelete.forEach(async (save) => {
      await deleteDoc(doc(db, 'data', userId, 'savings', save.id));
    });

    const userId = get().user?.email ?? '';
    await deleteDoc(doc(db, 'data', userId, 'revenues', props.id));
    const budget = get().budget;

    await setDoc(doc(db, 'data', userId, 'budget', 'value'), {
      budget: budget - (removed.savings ?? 0),
    });

    set((d) => ({
      revenue,
      budget: d.budget - (removed.savings ?? 0),
      savings,
    }));
  },
  async removeOrnament(props) {
    const ornament = get().ornament;
    const idx = ornament.findIndex((o) => o.id === props.id);
    const [removed] = ornament.splice(idx, 1);

    const dailyExpenditures = get().dailyExpenditures.filter(
      ({belongsTo, id}) => {
        if (belongsTo !== props.id) {
          return true;
        }

        // await deleteDoc(doc(db, 'data', userId, 'dailyExpenditures', id));
        return false;
      },
    );

    const userId = get().user?.email ?? '';
    const budget = get().budget;
    // await deleteDoc(doc(db, 'data', userId, 'ornaments', props.id));

    const uId = uuid();
    await setDoc(doc(db, 'data', userId, 'budget', 'value'), {
      budget: budget + (removed.value ?? 0),
    });

    set((d) => ({
      ornament,
      dailyExpenditures,
      budget: d.budget + removed.value,
    }));
  },
  async removeExpenditure(props) {
    const expenditures = get().expenditures;
    const idx = expenditures.findIndex((o) => o.id === props.id);
    const [removed] = expenditures.splice(idx, 1);

    const userId = get().user?.email ?? '';
    await deleteDoc(doc(db, 'data', userId, 'expenditures', props.id));

    const budget = get().budget;
    await setDoc(doc(db, 'data', userId, 'budget', 'value'), {
      budget: budget + (removed.value ?? 0),
    });

    set((d) => ({
      expenditures,
      budget: d.budget + removed.value,
    }));
  },
  populateStore(data, key) {
    set(() => ({[key]: data}));
  },
});

export default storeActions;
