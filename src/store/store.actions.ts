import {Alert} from 'react-native';
import {TheStore} from './store.types';
import {v4 as uuid} from 'uuid';
import {db} from '../services/firebase.config';
import {addDoc, collection} from 'firebase/firestore';

const storeActions: TheStore = (set, get) => ({
  toggleTheme: () => {
    set((state) => ({theme: state.theme === 'dark' ? 'light' : 'dark'}));
  },
  signIn(data) {
    set({isLoading: true});
    set(() => ({
      user: {
        email: data.email,
        name: data.email,
        userToken: uuid(),
      },
    }));
    set({isLoading: false});
  },
  signUp(data) {
    set({isLoading: true});
    set(() => ({
      user: {
        email: data.email,
        name: data.name,
        userToken: uuid(),
      },
    }));
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

    set((draft) => ({
      expenditures: [
        ...expenditures,
        {...props, daily: props.value, id: uuid()},
      ],
      budget: draft.budget - props.value,
    }));
    cb?.();
    set({isLoading: false});
  },
  async addRevenue(props, cb) {
    set({isLoading: true});
    const revenues = get().revenues;

    set((draft) => ({
      revenues: [...revenues, {...props, savings: props.value, id: uuid()}],
      budget: draft.budget + props.value,
    }));
    cb?.();
    set({isLoading: false});
  },
  async addDailyExpenditure(props, cb) {
    set({isLoading: true});
    let ornament = get().ornament;
    const draftIdx = ornament?.findIndex((e) => e.id === props.belongsTo);
    const value = ornament[draftIdx]?.daily ?? 0;

    if (value - props.value >= 0) {
      ornament[draftIdx].daily = value - props.value;

      set((draft) => ({
        dailyExpenditures: [...draft.dailyExpenditures, {...props, id: uuid()}],
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
    const userId = get().user?.email ?? 'e';
    // const docRef = await addDoc(collection(db, userId, ['ornaments']), data);
    // save the bidget

    set((d) => ({
      ornament: [...ornament, {...data, daily: data.value, id: uuid()}],
      budget: d.budget - data.value,
      // ornament: [...ornament, {...data, daily: data.value, id: docRef.id}],
    }));
    cb?.();
    set({isLoading: false});
  },
  async addSaving(props, cb) {
    set({isLoading: true});
    let revenues = get().revenues;
    const draftIdx = revenues?.findIndex((e) => e.id === props.belongsTo);
    const value = revenues[draftIdx]?.savings ?? 0;

    if (value - props.value >= 0) {
      revenues[draftIdx].savings = value - props.value;

      set((d) => ({
        savings: [...d.savings, {...props, id: uuid()}],
        revenues: [...revenues],
        budget: d.budget - props.value,
      }));

      cb?.();
    } else {
      Alert.alert('Não é possivel adicionares mais poupanças nesta receita.');
    }
    set({isLoading: false});
  },
  removeDailyExpenditure(props) {
    const dailyExpenditures = get().dailyExpenditures;
    const idx = dailyExpenditures.findIndex((o) => o.id === props.id);
    const [removed] = dailyExpenditures.splice(idx, 1);
    const ornament = get().ornament.map((exp) =>
      exp.id === removed.belongsTo
        ? {...exp, daily: (exp.daily ?? 0) + removed.value}
        : exp,
    );

    set({dailyExpenditures, ornament});
  },
  removeSaving(props) {
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
  removeExpenditure(props) {
    const expenditures = get().expenditures;
    const idx = expenditures.findIndex((o) => o.id === props.id);
    const [removed] = expenditures.splice(idx, 1);

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
