import {useEffect} from 'react';
import {getData} from 'services/firebase.config';
import useStore from 'store';
import {
  Store,
  TDailyExpenditure,
  TExpenditure,
  TOrnamentMensal,
  TRevenue,
  TSaving,
} from 'store/store.types';

export const usePopulateOnInit = async () => {
  const populateStore = useStore().populateStore;
  const email = useStore((s) => s.user?.email ?? '');

  useEffect(() => {
    const populate = async () => {
      const revenuesRef = await getData(email, 'revenues');
      const ornamentRef = await getData(email, 'ornaments');
      const expendituresRef = await getData(email, 'expenditures');
      const dailyExpendituresRef = await getData(email, 'dailyExpenditure');
      const savingsRef = await getData(email, 'savings');
      const globalRef = await getData(email, 'global');

      const revenues: TRevenue[] = [];
      revenuesRef.forEach((snapshot) => {
        const {source, value, savings} = snapshot.data() as Omit<
          TRevenue,
          'id'
        >;
        revenues.push({source, value, savings, id: snapshot.id});
      });
      populateStore<TRevenue[]>(revenues, 'revenues');

      const ornaments: TOrnamentMensal[] = [];
      ornamentRef.forEach((snapshot) => {
        const {source, value, daily} = snapshot.data() as Omit<
          TOrnamentMensal,
          'id'
        >;
        ornaments.push({source, value, daily, id: snapshot.id});
      });
      populateStore<TOrnamentMensal[]>(ornaments, 'ornament');

      const expenditures: TExpenditure[] = [];
      expendituresRef.forEach((snapshot) => {
        const {source, value} = snapshot.data() as Omit<TExpenditure, 'id'>;

        expenditures.push({source, value, id: snapshot.id});
      });
      populateStore<TExpenditure[]>(expenditures, 'expenditures');

      const dailyExpenditures: TDailyExpenditure[] = [];
      dailyExpendituresRef.forEach((snapshot) => {
        const {source, value, belongsTo} = snapshot.data() as Omit<
          TDailyExpenditure,
          'id'
        >;

        dailyExpenditures.push({source, value, belongsTo, id: snapshot.id});
      });
      populateStore<TDailyExpenditure[]>(
        dailyExpenditures,
        'dailyExpenditures',
      );

      const savings: TSaving[] = [];
      savingsRef.forEach((snapshot) => {
        const {source, value, belongsTo} = snapshot.data() as Omit<
          TSaving,
          'id'
        >;

        savings.push({source, value, belongsTo, id: snapshot.id});
      });
      populateStore<TSaving[]>(savings, 'savings');

      globalRef.forEach((snapshot) => {
        const {balance, budget} = snapshot.data() as Pick<
          Store,
          'budget' | 'balance'
        >;

        populateStore<number>(balance, 'balance');
        populateStore<number>(budget, 'budget');
      });
    };

    populate();
  }, []);
};
