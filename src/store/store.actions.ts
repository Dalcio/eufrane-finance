import {Alert} from 'react-native';
import {TheStore} from './store.types';
import {v4 as uuid} from 'uuid';

const storeActions: TheStore = (set, get) => ({
  toggleTheme: () => {
    set((state) => ({theme: state.theme === 'dark' ? 'light' : 'dark'}));
  },
  signIn(data) {
    set(() => ({
      user: {
        email: data.email,
        name: data.email,
        userToken: new Date().toLocaleTimeString(),
      },
    }));
  },
  signUp(data) {
    set(() => ({
      user: {
        email: data.email,
        name: data.name,
        userToken: new Date().toLocaleTimeString(),
      },
    }));
  },
  addExpenditure(props) {
    const expenditures = get().expenditures;

    set((draft) => ({
      expenditures: [
        ...expenditures,
        {...props, daily: props.value, id: uuid()},
      ],
      budget: draft.budget - props.value,
    }));
  },
  addRevenue(props) {
    const revenues = get().revenues;

    set((draft) => ({
      revenues: [...revenues, {...props, id: uuid()}],
      budget: draft.budget + props.value,
    }));
  },
  addDailyExpenditure(props) {
    let ornament = get().ornament;
    const draftIdx = ornament?.findIndex((e) => e.id === props.belongsTo);
    const value = ornament[draftIdx]?.daily ?? 0;

    if (value - props.value >= 0) {
      ornament[draftIdx].daily = value - props.value;

      set((draft) => ({
        dailyExpenditures: [...draft.dailyExpenditures, {...props, id: uuid()}],
        expenditures: [...ornament],
      }));
    } else {
      Alert.alert(
        'Não é possivel adicionares mais neste gasto. Limite ultrapassado',
      );
    }
  },
  addOrnament(props) {
    const ornament = get().ornament;

    set(() => ({
      ornament: [...ornament, {...props, daily: props.value, id: uuid()}],
    }));
  },
  addSaving(props) {
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
    } else {
      Alert.alert('Não é possivel adicionares mais poupanças nesta receita.');
    }
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

    set((d) => ({dailyExpenditures, ornament}));
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

    set((d) => ({
      revenue,
      budget: d.budget - removed.value,
    }));
  },
  removeOrnament(props) {
    const ornament = get().ornament.filter((o) => o.id !== props.id);

    set((d) => ({
      ornament,
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
});

export default storeActions;
