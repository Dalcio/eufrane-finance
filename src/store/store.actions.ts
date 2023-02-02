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
      expenditures: [
        ...expenditures,
        {...props, daily: props.value, id: docRef.id},
      ],
      budget: draft.budget - props.value,
    }));
    cb?.();
    set({isLoading: false});
  },
  async addRevenue(props, cb) {
    set({isLoading: true});
    const revenues = get().revenues;
    const userId = get().user?.email ?? '';
    const docRef = await addDoc(
      collection(db, 'data', userId, 'revenues'),
      props,
    );

    set((draft) => ({
      revenues: [...revenues, {...props, savings: props.value, id: docRef.id}],
      budget: draft.budget + props.value,
    }));
    cb?.();
    set({isLoading: false});
  },
  async addDailyExpenditure(props, cb) {
    set({isLoading: true});
    let ornament = get().ornament;
    const userId = get().user?.email ?? '';
    const draftIdx = ornament?.findIndex((e) => e.id === props.belongsTo);
    const value = ornament[draftIdx]?.daily ?? 0;

    const docRef = await addDoc(
      collection(db, 'data', userId, 'dailyExpenditures'),
      props,
    );

    if (value - props.value >= 0) {
      ornament[draftIdx].daily = value - props.value;

      set((draft) => ({
        dailyExpenditures: [
          ...draft.dailyExpenditures,
          {...props, id: docRef.id},
        ],
        expenditures: [...ornament],
      }));
      cb?.();
    } else {
      Alert.alert(
        'Não é possivel adicionares mais neste gasto. Limite ultrapassado',
      );
    }
    set({isLoading: false});
  },
  async addOrnament(data, cb) {
    set({isLoading: true});
    const ornament = get().ornament;
    const userId = get().user?.email ?? '';

    try {
      const docRef = await addDoc(
        collection(db, 'data', userId, 'ornaments'),
        data,
      );

      set((d) => ({
        isLoading: false,
        budget: d.budget - data.value,
        ornament: [...ornament, {...data, daily: data.value, id: docRef.id}],
      }));
      cb?.();
    } catch (error) {
      set({isLoading: false});
    }
  },
  async addSaving(props, cb) {
    set({isLoading: true});
    let revenues = get().revenues;
    const draftIdx = revenues?.findIndex((e) => e.id === props.belongsTo);
    const value = revenues[draftIdx]?.savings ?? 0;
    const userId = get().user?.email ?? '';
    const docRef = await addDoc(
      collection(db, 'data', userId, 'savings'),
      props,
    );

    if (value - props.value >= 0) {
      revenues[draftIdx].savings = value - props.value;

      set((d) => ({
        savings: [...d.savings, {...props, id: docRef.id}],
        revenues: [...revenues],
        budget: d.budget - props.value,
      }));

      cb?.();
    } else {
      Alert.alert('Não é possivel adicionares mais poupanças nesta receita.');
    }
    set({isLoading: false});
  },
  async removeDailyExpenditure(props) {
    const dailyExpenditures = get().dailyExpenditures;
    const idx = dailyExpenditures.findIndex((o) => o.id === props.id);
    const [removed] = dailyExpenditures.splice(idx, 1);
    const ornament = get().ornament.map((exp) =>
      exp.id === removed.belongsTo
        ? {...exp, daily: (exp.daily ?? 0) + removed.value}
        : exp,
    );
    const userId = get().user?.email ?? '';
    await deleteDoc(doc(db, 'data', userId, 'dailyExpenditures', props.id));

    set({dailyExpenditures, ornament});
  },
  async removeSaving(props) {
    const savings = get().savings;
    const idx = savings.findIndex((o) => o.id === props.id);
    const [removed] = savings.splice(idx, 1);
    const revenues = get().revenues.map((exp) =>
      exp.id === removed.belongsTo
        ? {...exp, daily: (exp.savings ?? 0) + removed.value}
        : exp,
    );

    set((d) => ({savings, revenues}));
  },
  removeRevenue(props) {
    const revenue = get().revenues;
    const idx = revenue.findIndex((o) => o.id === props.id);
    const [removed] = revenue.splice(idx, 1);

    const savings = get().savings.filter(
      ({belongsTo}) => belongsTo !== props.id,
    );

    set((d) => ({
      revenue,
      budget: d.budget - (removed.savings ?? 0),
      savings,
    }));
  },
  removeOrnament(props) {
    const ornament = get().ornament;
    const idx = ornament.findIndex((o) => o.id === props.id);
    const [removed] = ornament.splice(idx, 1);

    const dailyExpenditures = get().dailyExpenditures.filter(
      ({belongsTo}) => belongsTo !== props.id,
    );

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
